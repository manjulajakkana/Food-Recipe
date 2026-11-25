import { useState } from "react";

import "../styles/community.css";

const toList = (value) =>
  Array.isArray(value)
    ? value
    : String(value || "")
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);

function CommunityRecipes({
  recipes,
  currentUser,
  reviews,
  onDelete,
  onAddReview,
}) {
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Recipes shared by users (everyone's recipes).
  const sharedRecipes = recipes.filter((recipe) => recipe.isShared);

  // The popup always reads the latest recipe, so it closes by itself
  // when that recipe is deleted.
  const openRecipe =
    sharedRecipes.find((recipe) => recipe.id === openRecipeId) || null;

  const getReviews = (recipeId) =>
    (reviews || []).filter((review) => review.recipeId === recipeId);

  const getRating = (recipeId) => {
    const list = getReviews(recipeId);

    if (list.length === 0) return "5.0";

    const total = list.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );

    return (total / list.length).toFixed(1);
  };

  const isOwnerOf = (recipe) =>
    currentUser && recipe.sharedByEmail === currentUser.email;

  const openPopup = (recipe) => {
    setRatingValue(0);
    setHoverValue(0);
    setReviewText("");
    setOpenRecipeId(recipe.id);
  };

  const closePopup = () => setOpenRecipeId(null);

  const submitReview = (event) => {
    event.preventDefault();

    if (!openRecipe) return;

    if (ratingValue < 1) {
      alert("Please select a star rating.");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write your review.");
      return;
    }

    onAddReview(openRecipe.id, ratingValue, reviewText.trim());

    setRatingValue(0);
    setHoverValue(0);
    setReviewText("");
  };

  return (
    <section className="cr-section">
      <div className="cr-heading">
        <p className="hero-eyebrow">COMMUNITY RECIPES</p>
        <h2>Community Recipes</h2>
        <p>Recipes shared by you and everyone in our community.</p>
      </div>

      {sharedRecipes.length === 0 ? (
        <div className="cr-empty">
          <h3>No community recipes yet</h3>
          <p>
            Fill in the form above and publish your recipe. It will appear
            here for everyone to see.
          </p>
        </div>
      ) : (
        <div className="cr-grid">
          {sharedRecipes.map((recipe) => (
            <article className="cr-card" key={recipe.id}>
              <div className="cr-card-image">
                <img
                  src={recipe.image || "images/pizza.jpg"}
                  alt={recipe.name}
                  onError={(event) => {
                    event.currentTarget.src = "images/pizza.jpg";
                  }}
                />
              </div>

              <div className="cr-card-info">
                <div className="cr-rating-line">
                  <span className="cr-star">★</span>
                  {getRating(recipe.id)}
                  <span className="cr-tag">Community Recipe</span>
                </div>

                <h3>{recipe.name}</h3>

                <p className="cr-desc">{recipe.description}</p>

                <p className="cr-by">
                  Shared by{" "}
                  {isOwnerOf(recipe) ? "You" : recipe.sharedBy || "A user"}
                </p>

                <div className="cr-meta">
                  <span>⏱ {recipe.time || "30 min"}</span>
                  <span>🌶 {recipe.difficulty || "Easy"}</span>
                </div>

                <div className="cr-buttons">
                  <button
                    type="button"
                    className="cr-view"
                    onClick={() => openPopup(recipe)}
                  >
                    View Recipe →
                  </button>

                  {isOwnerOf(recipe) && (
                    <button
                      type="button"
                      className="cr-delete"
                      onClick={() => onDelete(recipe)}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* RECIPE POPUP */}
      {openRecipe && (
        <div className="cr-backdrop" onClick={closePopup}>
          <div
            className="cr-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="cr-close"
              onClick={closePopup}
              aria-label="Close recipe"
            >
              ×
            </button>

            <img
              className="cr-modal-image"
              src={openRecipe.image || "images/pizza.jpg"}
              alt={openRecipe.name}
              onError={(event) => {
                event.currentTarget.src = "images/pizza.jpg";
              }}
            />

            <h2>{openRecipe.name}</h2>

            <p className="cr-modal-line">
              <span className="cr-star">★</span> {getRating(openRecipe.id)}
              <span className="cr-tag">Community Recipe</span>
            </p>

            <p className="cr-modal-line">
              ⏱ {openRecipe.time || "30 min"}
              <span className="cr-gap">🌶 {openRecipe.difficulty || "Easy"}</span>
            </p>

            <h3>🥕 Ingredients</h3>
            <div className="cr-text">
              {toList(openRecipe.ingredients).map((item, index) => (
                <p key={index}>• {item}</p>
              ))}
            </div>

            <h3>👨‍🍳 Preparation</h3>
            <div className="cr-text">
              {toList(openRecipe.instructions).map((step, index) => (
                <p key={index}>
                  {index + 1}. {step.replace(/^\d+[.)]\s*/, "")}
                </p>
              ))}
            </div>

            {isOwnerOf(openRecipe) && (
              <button
                type="button"
                className="cr-delete cr-delete-wide"
                onClick={() => onDelete(openRecipe)}
              >
                🗑️ Delete Recipe
              </button>
            )}

            {/* RATING SUMMARY */}
            <div className="cr-rating-summary">
              <span className="cr-big-rating">
                <span className="cr-star">★</span> {getRating(openRecipe.id)}
              </span>
              <span className="cr-review-count">
                ({getReviews(openRecipe.id).length}{" "}
                {getReviews(openRecipe.id).length === 1
                  ? "review"
                  : "reviews"}
                )
              </span>
            </div>

            {/* RATE THIS RECIPE */}
            <form className="cr-review-form" onSubmit={submitReview}>
              <h3>⭐ Rate this Recipe</h3>

              <div className="cr-stars" onMouseLeave={() => setHoverValue(0)}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={
                      value <= (hoverValue || ratingValue) ? "on" : ""
                    }
                    onMouseEnter={() => setHoverValue(value)}
                    onClick={() => setRatingValue(value)}
                    aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Write your review..."
                rows="3"
              />

              <button type="submit" className="cr-submit">
                📝 Submit Review
              </button>
            </form>

            {/* REVIEWS */}
            <div className="cr-reviews">
              <h3>💬 Reviews</h3>

              {getReviews(openRecipe.id).length === 0 ? (
                <p className="cr-no-reviews">
                  No reviews yet. Be the first to review this recipe! ❤️
                </p>
              ) : (
                getReviews(openRecipe.id).map((review) => (
                  <div className="cr-review-item" key={review.id}>
                    <div className="cr-review-head">
                      <strong>{review.userName}</strong>
                      <span className="cr-review-stars">
                        {"★".repeat(Number(review.rating))}
                      </span>
                      <span className="cr-review-date">{review.date}</span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CommunityRecipes;