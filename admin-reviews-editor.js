const DEFAULT_REVIEWS = [
  { text: "I’ve never felt more confident. She just gets it.", name: "Jessica R.", rating: "5 stars" },
  { text: "The color looks soft, expensive, and completely natural.", name: "Marisol A.", rating: "5 stars" },
  { text: "My blowout lasted for days. I’m obsessed.", name: "Kayla M.", rating: "5 stars" }
];

function createReviewRow(review = { text: "New client review.", name: "Client Name", rating: "5 stars" }) {
  const row = document.createElement("div");
  row.className = "review-edit-row";
  row.innerHTML = `
    <div class="admin-field">
      <label>Review text</label>
      <textarea data-review-text>${review.text}</textarea>
    </div>
    <div class="admin-field">
      <label>Client name</label>
      <input type="text" value="${review.name}" data-review-name />
    </div>
    <div class="admin-field">
      <label>Rating</label>
      <select data-review-rating>
        <option ${review.rating === "5 stars" ? "selected" : ""}>5 stars</option>
        <option ${review.rating === "4 stars" ? "selected" : ""}>4 stars</option>
        <option ${review.rating === "3 stars" ? "selected" : ""}>3 stars</option>
      </select>
      <button class="button button--ghost" type="button" data-remove-review>Remove</button>
    </div>
  `;
  return row;
}

function ensureReviewsAdminSection() {
  const pageList = document.querySelector(".admin-page-list");
  const actions = document.querySelector(".admin-actions");

  if (pageList && !pageList.querySelector('[data-admin-page="reviews"]')) {
    const reviewsButton = document.createElement("button");
    reviewsButton.className = "admin-page-link";
    reviewsButton.type = "button";
    reviewsButton.dataset.adminPage = "reviews";
    reviewsButton.setAttribute("aria-pressed", "false");
    reviewsButton.innerHTML = `<span>Reviews</span><span aria-hidden="true">06</span>`;

    const bookingButton = pageList.querySelector('[data-admin-page="booking"]');
    const footerButton = pageList.querySelector('[data-admin-page="footer"]');
    pageList.insertBefore(reviewsButton, bookingButton || footerButton || null);
  }

  if (actions && !document.querySelector('[data-admin-content="reviews"]')) {
    const panel = document.createElement("div");
    panel.className = "admin-content-page";
    panel.dataset.adminContent = "reviews";
    panel.innerHTML = `
      <section class="admin-section">
        <h2>Landing page reviews</h2>
        <p class="admin-section__copy">
          Reviews slide left-to-right on the landing page. This section can be turned off completely, or the owner can add and remove reviews as needed.
        </p>

        <div class="reviews-editor">
          <div class="reviews-editor__topline">
            <label class="reviews-editor__visibility">
              <input type="checkbox" checked data-reviews-visible />
              Show reviews on landing page
            </label>
            <button class="button button--ghost reviews-editor__add" type="button" data-add-review>Add Review</button>
          </div>

          <div class="review-edit-list" data-review-list></div>
        </div>
      </section>
    `;

    actions.parentNode.insertBefore(panel, actions);

    const list = panel.querySelector("[data-review-list]");
    DEFAULT_REVIEWS.forEach((review) => list.appendChild(createReviewRow(review)));
  }
}

ensureReviewsAdminSection();

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-add-review]")) {
    document.querySelector("[data-review-list]")?.appendChild(createReviewRow());
    return;
  }

  const removeButton = event.target.closest("[data-remove-review]");
  if (removeButton) {
    removeButton.closest(".review-edit-row")?.remove();
  }
});
