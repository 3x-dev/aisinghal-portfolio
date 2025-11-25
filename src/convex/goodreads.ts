import { httpAction } from "./_generated/server";
import { XMLParser } from "fast-xml-parser";

const GOODREADS_USER_ID = "195680955";
const GOODREADS_FEED_BASE = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}`;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  textNodeName: "text",
  trimValues: true,
  removeNSPrefix: true,
});

const ensureHttps = (value?: string) => {
  if (!value) return "";
  if (value.startsWith("https://")) return value;
  if (value.startsWith("http://")) {
    return `https://${value.slice(7)}`;
  }
  return value;
};

const stripMarkup = (value?: string) =>
  (value ?? "").replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const removeMetaBlock = (value: string) =>
  value.replace(/author:[\s\S]*?review:/gi, "").trim();

const buildSummary = (bookDescription: string, fallbackDescription: string) => {
  const primary = removeMetaBlock(stripMarkup(bookDescription));
  if (primary) return primary;
  return removeMetaBlock(stripMarkup(fallbackDescription));
};

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const buildFeedUrl = (shelf: string, limit: number) => {
  const pageSize = Math.min(Math.max(limit * 2, 20), 60);
  const params = new URLSearchParams({
    per_page: String(pageSize),
    shelf,
    order: "d",
  });
  return `${GOODREADS_FEED_BASE}?${params.toString()}`;
};

export const goodreads = httpAction(async (_ctx, request) => {
  const url = new URL(request.url);
  const shelf = url.searchParams.get("shelf") ?? "currently-reading";
  const limitParam = Number(url.searchParams.get("limit") ?? "24");
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 40) : 24;

  try {
    const response = await fetch(buildFeedUrl(shelf, limit), {
      headers: {
        Accept: "application/rss+xml, text/xml;q=0.9, */*;q=0.8",
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: "goodreads_unavailable",
          message: "Goodreads returned an unexpected response.",
        }),
        {
          status: response.status === 404 ? 404 : 502,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    }

    const xml = await response.text();
    const parsed = parser.parse(xml);
    const channel = parsed?.rss?.channel ?? {};
    const items = channel.item ?? [];
    const books = (Array.isArray(items) ? items : [items])
      .map((item) => {
        const summary = buildSummary(item.book_description ?? "", item.description ?? "");
        return {
          id:
            item.guid ??
            item.book_id ??
            item.link ??
            `goodreads-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          title: item.title ?? "",
          author: item.author_name ?? "",
          imageUrl:
            ensureHttps(item.book_large_image_url) ||
            ensureHttps(item.book_medium_image_url) ||
            ensureHttps(item.book_small_image_url),
          link: item.link ?? item.book_link ?? "",
          userRating: toNumber(item.user_rating),
          averageRating: toNumber(item.average_rating),
          pages: toNumber(item.book_num_pages),
          shelves: String(item.user_shelves ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          summary,
          dateRead: item.user_read_at ?? "",
          dateAdded: item.user_date_added ?? "",
          published: item.book_published ?? "",
        };
      })
      .filter((book) => book.title);

    return new Response(
      JSON.stringify({
        shelf,
        fetchedAt: Date.now(),
        books: books.slice(0, limit),
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "public, max-age=600",
        },
      },
    );
  } catch (error) {
    console.error("[convex.goodreads] failed to reach Goodreads", error);
    return new Response(
      JSON.stringify({
        error: "goodreads_fetch_failed",
        message: "Could not reach Goodreads right now. Please try again shortly.",
      }),
      {
        status: 502,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
});

