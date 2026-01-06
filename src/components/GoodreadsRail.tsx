import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedEffects } from "@/hooks/use-reduced-effects";

export type GoodreadsShelf = "currently-reading" | "read" | "to-read";

interface GoodreadsRailProps {
  shelf?: GoodreadsShelf;
  limit?: number;
  profileUrl?: string;
}

interface GoodreadsBook {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  link: string;
  userRating: number | null;
  averageRating: number | null;
  pages: number | null;
  shelves: string[];
  summary: string;
  dateRead: string;
  dateAdded: string;
  published: string;
}

const GOODREADS_USER_ID = "195680955";
const GOODREADS_BASE_URL = "https://www.goodreads.com";
const GOODREADS_FEED_PATH = `/review/list_rss/${GOODREADS_USER_ID}`;
const DEFAULT_PROFILE_URL = `${GOODREADS_BASE_URL}/user/show/195680955-aryan-singhal`;
const convexHttpBase =
  import.meta.env.VITE_CONVEX_HTTP_URL ??
  (import.meta.env.VITE_CONVEX_URL
    ? `${import.meta.env.VITE_CONVEX_URL.replace(/\/$/, "")}/api/http`
    : "");

const buildFeedPathWithQuery = (shelf: GoodreadsShelf, limit: number) => {
  const pageSize = Math.max(limit * 2, 20);
  const params = new URLSearchParams({
    per_page: String(pageSize),
    shelf,
    order: "d",
  });
  return `${GOODREADS_FEED_PATH}?${params.toString()}`;
};

const shelfLabels: Record<GoodreadsShelf, string> = {
  "currently-reading": "Currently reading",
  read: "Recently finished",
  "to-read": "On deck",
};

const fallbackProxyTargets = (shelf: GoodreadsShelf, limit: number) => {
  const feedPathWithQuery = buildFeedPathWithQuery(shelf, limit);
  const absoluteFeedUrl = `${GOODREADS_BASE_URL}${feedPathWithQuery}`;
  const targets: string[] = [];

  if (import.meta.env.DEV) {
    targets.push(`/dev/goodreads${feedPathWithQuery}`);
  }

  targets.push(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(absoluteFeedUrl)}&timestamp=${Date.now()}`,
    absoluteFeedUrl,
  );

  return targets;
};

const statusFromShelves = (shelves: string[]) => {
  if (shelves.includes("currently-reading")) return "In progress";
  if (shelves.includes("read")) return "Finished";
  if (shelves.includes("to-read")) return "Queued";
  return "On shelf";
};

const StarRating = ({ rating }: { rating: number | null }) => {
  if (!rating) {
    return <span className="text-xs text-gray-500">No rating yet</span>;
  }

  return (
    <div className="flex items-center gap-1 text-amber-300">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < Math.round(rating) ? "text-amber-300" : "text-gray-600"}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-gray-400">{rating.toFixed(1)}</span>
    </div>
  );
};

export function GoodreadsRail({
  shelf = "currently-reading",
  limit = 12,
  profileUrl = DEFAULT_PROFILE_URL,
}: GoodreadsRailProps) {
  const [books, setBooks] = useState<GoodreadsBook[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { shouldReduceEffects } = useReducedEffects();

  useEffect(() => {
    let cancelled = false;

    const fetchShelf = async () => {
      setState("loading");
      setErrorMessage(null);
      try {
        const books = convexHttpBase
          ? await fetchViaConvex(shelf, limit)
          : await fetchViaProxy(shelf, limit);
        if (cancelled) return;

        setBooks(books.slice(0, limit));
        setState("ready");
      } catch (error) {
        if (cancelled) return;
        if (!convexHttpBase) {
          // Try proxy fallback if Convex isn't configured.
          try {
            const books = await fetchViaProxy(shelf, limit);
            if (cancelled) return;
            setBooks(books.slice(0, limit));
            setState("ready");
            return;
          } catch (proxyError) {
            console.error("[GoodreadsRail] proxy fallback failed", proxyError);
          }
        }

        console.error("[GoodreadsRail] Failed to load shelf", error);
        setState("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong while loading Goodreads.",
        );
      }
    };

    fetchShelf();
    return () => {
      cancelled = true;
    };
  }, [limit, shelf]);

  useEffect(() => {
    containerRef.current?.scrollTo({ left: 0 });
  }, [shelf]);

  const visibleBooks = useMemo(() => books.slice(0, limit), [books, limit]);
  const hasLoop = visibleBooks.length > 2;
  const loopedBooks = useMemo(
    () => (hasLoop ? [...visibleBooks, ...visibleBooks] : visibleBooks),
    [hasLoop, visibleBooks],
  );

  useEffect(() => {
    if (!containerRef.current || !hasLoop || shouldReduceEffects) {
      return;
    }

    let rafId: number;
    const scrollSpeed = 0.35;
    const animate = () => {
      const node = containerRef.current;
      if (!node) {
        return;
      }

      if (!isHovered) {
        node.scrollLeft += scrollSpeed;
        const resetPoint = node.scrollWidth / 2;
        if (node.scrollLeft >= resetPoint) {
          node.scrollLeft -= resetPoint;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [hasLoop, isHovered, shouldReduceEffects, visibleBooks.length]);

  const hasBooks = visibleBooks.length > 0;
  const booksToRender = state === "ready" && hasBooks ? loopedBooks : visibleBooks;
  const fetchViaConvex = async (targetShelf: GoodreadsShelf, batchSize: number) => {
    if (!convexHttpBase) throw new Error("Convex HTTP base is not configured.");
    const params = new URLSearchParams({
      shelf: targetShelf,
      limit: String(batchSize),
    });
    const response = await fetch(`${convexHttpBase}/goodreads?${params.toString()}`);
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new Error(payload?.message || "Goodreads returned an unexpected response.");
    }
    const payload = (await response.json()) as { books?: GoodreadsBook[] };
    if (!payload?.books?.length) {
      throw new Error("Goodreads returned an empty list.");
    }
    return payload.books;
  };

  const fetchViaProxy = async (targetShelf: GoodreadsShelf, batchSize: number) => {
    const urls = fallbackProxyTargets(targetShelf, batchSize);
    let lastError: Error | null = null;
    for (const url of urls) {
      try {
        const response = await fetch(url, {
          headers: {
            Accept: "application/rss+xml, text/xml;q=0.9, */*;q=0.8",
          },
        });
        if (!response.ok) {
          throw new Error(`Proxy responded with ${response.status}`);
        }
        const xml = await response.text();
        if (!xml.trim()) {
          throw new Error("Proxy returned an empty feed");
        }
        return transformRssXml(xml);
      } catch (error) {
        lastError =
          error instanceof Error
            ? error
            : new Error("Something went wrong while reaching Goodreads.");
      }
    }
    throw lastError ?? new Error("Unable to reach Goodreads right now.");
  };

  const renderSkeletons = () =>
    Array.from({ length: Math.min(4, limit) }).map((_, idx) => (
      <div
        key={`skeleton-${idx}`}
        className="min-w-[220px] max-w-[240px] flex-1 animate-pulse rounded-2xl border border-white/5 bg-white/5 p-4"
      >
        <div className="mb-4 aspect-[3/4] rounded-xl bg-white/5" />
        <div className="mb-2 h-4 rounded bg-white/10" />
        <div className="h-3 w-2/3 rounded bg-white/10" />
      </div>
    ));

  return (
    <div className="space-y-4">
      {state === "error" && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          <p>Couldn&apos;t reach Goodreads right now.</p>
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-2 text-rose-200 underline decoration-dotted underline-offset-4"
          >
            Open my shelf on Goodreads →
          </a>
          {errorMessage && <p className="mt-2 text-xs text-rose-200/70">{errorMessage}</p>}
        </div>
      )}

      <div className="relative">
        <div
          ref={containerRef}
          className={`goodreads-rail flex gap-6 overflow-x-auto pb-4 pt-2 ${
            visibleBooks.length < 3 ? "justify-center" : "justify-start"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onFocusCapture={() => setIsHovered(true)}
          onBlurCapture={() => setIsHovered(false)}
        >
          {state === "loading" && visibleBooks.length === 0
            ? renderSkeletons()
            : hasBooks
            ? booksToRender.map((book, index) => (
                <motion.a
                  key={`${book.id || book.title}-${index}`}
                  href={book.link || profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${book.title} on Goodreads`}
                  whileHover={{ y: -6 }}
                  className="group relative flex min-w-[220px] max-w-[240px] flex-1 snap-start flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-white/0 to-white/5 p-4 backdrop-blur"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                    {book.imageUrl ? (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                        Cover coming soon
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-wide text-white">
                      {statusFromShelves(book.shelves)}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="text-base font-semibold text-white">{book.title}</p>
                      <p className="text-sm text-gray-400">{book.author}</p>
                    </div>
                    <StarRating rating={book.userRating ?? book.averageRating} />
                    {book.pages && (
                      <p className="text-xs text-gray-500">{book.pages} pages</p>
                    )}
                    {book.summary && (
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {book.summary.slice(0, 160)}
                        {book.summary.length > 160 ? "…" : ""}
                      </p>
                    )}
                  </div>
                </motion.a>
              ))
            : (
                <div className="text-sm text-gray-400">
                  Nothing to show on this shelf just yet — check back soon.
                </div>
              )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-gray-500">
        <span>{shelfLabels[shelf]}</span>
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 underline decoration-dotted underline-offset-4 transition hover:text-white"
        >
          See everything on Goodreads →
        </a>
      </div>
    </div>
  );
}

const transformRssXml = (xml: string): GoodreadsBook[] => {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return [];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");

  if (doc.querySelector("parsererror")) {
    throw new Error("Unable to parse Goodreads feed");
  }

  const ensureHttps = (value?: string) => {
    if (!value) return "";
    if (value.startsWith("https://")) return value;
    if (value.startsWith("http://")) {
      return `https://${value.slice(7)}`;
    }
    return value;
  };

  const stripHtml = (value: string) =>
    value.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  const removeMetaBlock = (value: string) =>
    value.replace(/author:[\s\S]*?review:/gi, "").trim();

  const buildSummary = (bookDescription: string, fallbackDescription: string) => {
    const primary = removeMetaBlock(stripHtml(bookDescription));
    if (primary) return primary;
    return removeMetaBlock(stripHtml(fallbackDescription));
  };

  const toNumberOrNull = (value: string) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  };

  return Array.from(doc.querySelectorAll("item"))
    .map((item) => {
      const get = (selector: string) =>
        item.querySelector(selector)?.textContent?.trim() ?? "";

      const image =
        ensureHttps(get("book_large_image_url")) ||
        ensureHttps(get("book_small_image_url"));

      return {
        id: get("guid") || get("book_id") || get("link"),
        title: get("title"),
        author: get("author_name"),
        imageUrl: image,
        link: get("link") || get("book_url") || get("book_link"),
        userRating: toNumberOrNull(get("user_rating")),
        averageRating: toNumberOrNull(get("average_rating")),
        pages: toNumberOrNull(get("book_num_pages")),
        shelves: get("user_shelves")
          .split(",")
          .map((shelf) => shelf.trim())
          .filter(Boolean),
        summary: buildSummary(get("book_description"), get("description")),
        dateRead: get("user_read_at"),
        dateAdded: get("user_date_added"),
        published: get("book_published"),
      };
    })
    .filter((book) => book.title);
};
