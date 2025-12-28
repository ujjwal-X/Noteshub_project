import React, { useState } from "react";
import "./Cards.css";

function Card({
  image,
  download,
  name,
  cardId,
  userId,
  isFavoritedInitial = false,
}) {
  const [isFavorited, setIsFavorited] = useState(isFavoritedInitial);

  // ✅ Check if user is logged in
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const toggleFavorite = async () => {
    if (!isLoggedIn) return;

    const newFav = !isFavorited;
    setIsFavorited(newFav);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/${userId}/favorites`,
        {
          method: newFav ? "POST" : "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cardId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }
    } catch (err) {
      console.error(err);
      setIsFavorited(!newFav); // rollback UI
    }
  };

  return (
    <div className="card p-8 relative">
      <div className="card__body relative">
        {/* Heart Button - styled & top-right */}
        {isLoggedIn && (
          <button
            onClick={toggleFavorite}
            className="favorite-btn"
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorited ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="red"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.435 4.582a5.574 5.574 0 0 0-7.885 0l-.55.55-.55-.55A5.574 5.574 0 0 0 4.565 4.582a5.574 5.574 0 0 0 0 7.885l8.1 8.1 8.1-8.1a5.574 5.574 0 0 0 0-7.885z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.435 4.582a5.574 5.574 0 0 0-7.885 0l-.55.55-.55-.55A5.574 5.574 0 0 0 4.565 4.582a5.574 5.574 0 0 0 0 7.885l8.1 8.1 8.1-8.1a5.574 5.574 0 0 0 0-7.885z"
                />
              </svg>
            )}
          </button>
        )}

        <img src={image} className="card__image" alt="image-card" />
        <h2 className="card__title pt-4 text-center font-bold">{name}</h2>
      </div>

      <div className="card__footer">
        <button className="card__btn">
          <a href={download} download>
            Download
          </a>
        </button>
      </div>
    </div>
  );
}

export default Card;
