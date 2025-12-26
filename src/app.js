import express from "express";
import moviesRoutes from "./routes/movies.js";
import favoritesRoutes from "./routes/favorites.js";

const app = express();
app.use(express.json());

app.use("/movies", moviesRoutes);
app.use("/favorites", favoritesRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => console.log("Server running on port 3000"));
}
export default app;
