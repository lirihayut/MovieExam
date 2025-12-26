import request from "supertest";
import app from "../src/app.js";


 //Integration tests for the Movies and Favorites application.
 //These scenarios ensure that the API handles user interactions correctly.

describe("Movie API Tests", () => {
  
  // Define descriptive data for our testing scenarios
  const fightClubMovie = { id: "550", title: "Fight Club" };
  const MissingId = "999999";
  const gibberish = "zxywvutsrq123";

  // Testing  Favorites 
  describe("User Favorites Management", () => {
    
    test("should allow a user to save a movie to their favorites", async () => {
      // Simulate a user adding a movie to 'favorites' 
      const apiResponse = await request(app)
        .post("/favorites")
        .send(fightClubMovie);

      // Verify the movie was added successfully
      expect(apiResponse.statusCode).toBe(200);
      expect(apiResponse.body).toContainEqual(fightClubMovie);
    });

    test("should reject a favorite entry if the movie data is incomplete", async () => {
      //Send a payload without the required ID field
      const incompleteMovie = { title: "Test Movie" };
      
      const apiResponse = await request(app)
        .post("/favorites")
        .send(incompleteMovie);

      // Ensure the server catches the mistake with a 400 Bad Request
      expect(apiResponse.statusCode).toBe(400);
      expect(apiResponse.body).toHaveProperty("error");
    });

    test("should not fail when a user tries to remove a movie they never favorited", async () => {
      //  Attempt to delete a non-existent movie ID
      const apiResponse = await request(app).delete(`/favorites/${MissingId}`);
      
      //The system should handle this gracefully 
      expect(apiResponse.statusCode).toBe(200);
      expect(Array.isArray(apiResponse.body)).toBe(true);
    });
  });

  // Testing Movie Discovery & Details
  describe("Movie Search and Details", () => {
    
    test("should notify the user if they forgot to enter a search term", async () => {
      // Access the search route without any 'text' parameter
      const apiResponse = await request(app).get("/movies/search");

      // The server should ask for a valid input
      expect(apiResponse.statusCode).toBe(400); 
      expect(apiResponse.body.error).toBe("text is required"); 
    });

    test("should return zero results when searching for non-existent content", async () => {
      //  Search for a term that won't match any movie titles
      const apiResponse = await request(app).get(`/movies/search?text=${gibberish}`);

      // Expect a clean 200 status but an empty list
      expect(apiResponse.statusCode).toBe(200);
      expect(Array.isArray(apiResponse.body)).toBe(true);
      expect(apiResponse.body.length).toBe(0);
    });

    test("should provide specific details for a verified movie ID", async () => {
      // Retrieve details for a movie (Fight Club)
      const validMovieId = "550";
      const apiResponse = await request(app).get(`/movies/${validMovieId}`);

      // Confirm the returned data is accurate and structured correctly
      expect(apiResponse.statusCode).toBe(200);
      expect(apiResponse.body).toHaveProperty("name");
      expect(apiResponse.body.name).toBe("Fight Club");
    });
  });
});