import { useState } from "react";
import StarRating from "./StarRating";
import { addReview } from "../services/cafeService";

export default function ReviewForm({ cafeId, onSuccess }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const data = await addReview(cafeId, { name, rating, comment });
      setStatus({ type: "ok", message: data.message || "Review added successfully" });
      setName("");
      setComment("");
      setRating(5);
      onSuccess?.(data.cafe);
    } catch (err) {
      setStatus({
        type: "err",
        message: err.message || "Could not submit review",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-accent/10 bg-white p-5 shadow-soft"
    >
      <h3 className="font-display text-xl font-bold text-ink">Leave a review</h3>
      <p className="mt-1 text-sm text-accent/70">
        Share your café experience — saved in-session with mock data.
      </p>

      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-accent">Your name</span>
          <input
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={60}
            placeholder="e.g. Anusha"
          />
        </label>

        <div>
          <span className="mb-1 block text-sm font-medium text-accent">Rating</span>
          <StarRating value={rating} interactive onChange={setRating} size="lg" />
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-accent">Comment</span>
          <textarea
            className="input-field min-h-[110px] resize-y"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            maxLength={500}
            placeholder="What did you love about this café?"
          />
        </label>

        {status.message && (
          <p
            className={`rounded-xl px-3 py-2 text-sm ${
              status.type === "ok"
                ? "bg-emerald-50 text-emerald-800"
                : "bg-rose-50 text-rose-800"
            }`}
          >
            {status.message}
          </p>
        )}

        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit review"}
        </button>
      </div>
    </form>
  );
}
