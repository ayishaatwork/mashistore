import BodyClass from "@/components/BodyClass";
import "./collective.css";

export default function CollectivePage() {
  return (
    <>
      <BodyClass className="collective-theme" />
      <main className="collective-page page-container">
        {/* HERO / INTRO */}
        <section className="collective-hero">
          <img
            src="/icons/hero.svg"
            alt="The Travelling Picture Book 2025"
            className="collective-title"
          />

          <div className="collective-text">
            <p>
              The Travelling Picture Book Project started as a simple idea and
              grew into a shared creative journey.
            </p>

            <p>
              The project includes two books, one travelling from north to
              south, and the other from south to north. Each book moves from one
              artist to another, with every participant adding a story, drawing
              or thought to its pages.As the books travel, they collect
              different voices, places, and moments.
            </p>

            <p>
              Together they celebrate collaboration and the joy of shared
              making.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}



