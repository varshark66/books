import { useState, useMemo } from "react";
import "./App.css";

const EXAMPLES = [
  "harry potter",
  "the lord of the rings",
  "atomic habits",
  "wings of fire",
  "the alchemist",
  "python programming",
];

function coverUrl(cover_i: number | undefined, size = "M") {
  return cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`
    : null;
}

function BookCard({ book }: { book: any }) {
  const img = coverUrl(book.cover_i, "M");
  const authors = book.author_name?.join(", ") || "Unknown author";
  const year = book.first_publish_year || "—";

  return (
    <div className="card">
      {img ? (
        <img src={img} alt={book.title} className="cover" />
      ) : (
        <div className="cover placeholder">No Cover</div>
      )}
      <div className="meta">
        <h3 className="title">{book.title}</h3>
        <p className="authors">{authors}</p>
        <p className="year">First published: {year}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const searchBooks = async (q?: string) => {
    const qTrim = (q ?? query).trim();
    if (!qTrim) return;

    setLoading(true);
    setErr("");
    setBooks([]);

    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
        qTrim
      )}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setBooks(data.docs.slice(0, 40));
    } catch (e) {
      setErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") searchBooks();
  };

  const sorted = useMemo(() => {
    if (sortBy === "year") {
      return [...books].sort(
        (a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0)
      );
    }
    return books;
  }, [books, sortBy]);

  return (
    <div className="page">
      <header className="header">
        <h1>📚 Book Finder</h1>
        <p className="sub">Search books by title using the Open Library API.</p>
      </header>

      <section className="searchBar">
        <input
          aria-label="Search by title"
          className="input"
          placeholder="Type a book title… (e.g. harry potter)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn"
          onClick={() => searchBooks()}
          disabled={!query.trim() || loading}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </section>

      <section className="helpers">
        <div className="examples">
          Try:
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              className="chip"
              onClick={() => {
                setQuery(ex);
                searchBooks(ex);
              }}
            >
              {ex}
            </button>
          ))}
        </div>

        <div className="sorter">
          Sort:
          <select
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="year">Newest year first</option>
          </select>
        </div>
      </section>

      {err && <div className="error">{err}</div>}

      {!loading && sorted.length === 0 && !err && (
        <div className="empty">
          Start by searching a title above, or click an example.
        </div>
      )}

      {sorted.length > 0 && (
        <div className="resultsInfo">
          Showing {sorted.length} result
          {sorted.length > 1 ? "s" : ""}.
          <span className="hint">
            Tip: Click examples to quickly test different queries.
          </span>
        </div>
      )}

      <main className="grid">
        {sorted.map((b, i) => (
          <BookCard key={`${b.key}-${i}`} book={b} />
        ))}
      </main>

      <footer className="footer">
        <a
          href="https://openlibrary.org/developers/api"
          target="_blank"
          rel="noreferrer"
        >
          Open Library API
        </a>
      </footer>
    </div>
  );
}
