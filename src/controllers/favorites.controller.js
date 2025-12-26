let favorites = [];

export const getFavorites = (req, res) => {
  res.json(favorites);
};

export const addFavorite = (req, res) => {
  const movie = req.body;

  if (!movie || !movie.id) {
    return res.status(400).json({
      error: "Movie object with ID is required"
    });
  }

  if (favorites.some(f => f.id === movie.id)) {
    return res.status(409).json({
      error: "Movie already in favorites"
    });
  }

  favorites.push(movie);
  res.status(200).json(favorites);
};

export const deleteFavorite = (req, res) => {
  const movieId = req.params.id;

  favorites = favorites.filter(
    movie => movie.id !== movieId
  );

  res.json(favorites);
};
