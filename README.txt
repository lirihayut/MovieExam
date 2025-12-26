Movie Explorer API 
This backend Movie Explorer lets users search for movies and manage a personal favorites list.
It uses a custom-built 24-hour cache to make repeated searches instant and protect API limits.
The system is designed with a MVC structure, tested with Jest, and is optimized to be used by any web or mobile frontend.

Tech I Used
- Node.js & Express: The foundation of my server.
- Axios: Used for all communication with the TMDB API.
- Jest & Supertest: I used these to write integration tests, ensuring every feature works perfectly before I deploy.
- ES Modules: I used modern import/export syntax to keep the codebase clean.

Engineering Decisions
1. Backend Focus
I intentionally focused 100% of my effort on the API architecture rather than a UI (as recommended).
I used Postman to validate every endpoint, ensuring the JSON responses and status codes are industry-standard.

2. Why a 24-Hour Cache?
I chose a long TTL (24 hours) because movie data (titles, plots, years) is static and rarely changes.
This maximizes performance and directly fulfills the requirement to minimize external API calls.

3. Result Limiting (Top 50)
limiting the search results to the top 50.
This keeps response times fast and memory usage low—fetching thousands of results at once creates unnecessary lag for the user.

4. Environment Awareness
The server is configured to check process.env.NODE_ENV.
This prevents the server from starting a real network listener during tests, allowing my Jest tests to run in a clean, isolated environment without port conflicts.

5. Input Validation
I implemented strict checks on incoming data.
This results in a better user experience by returning clear 400 Bad Request errors instead of letting the server return empty results or crash.

Project Structure
I followed the MVC pattern by separating my Controllers from my Routes.
This ensures the routing files stay clean, while the complex business logic lives in dedicated, reusable modules.
* src/routes/: Defines the URL paths.
* src/controllers/: Handles the actual logic and API calls.
* src/cache.js: The logic for my memory-based cache.
* tests/: Automated tests for every endpoint.

API Endpoints
* GET /movies/search?text=...  -> Search for a movie title.
* GET /movies/:id              -> Get full details for a specific movie.
* GET /favorites               -> See everything in your favorites list.
* POST /favorites              -> Save a movie to your list (send a JSON body).
* DELETE /favorites/:id        -> Remove a movie from your list.

How to run it
1. Install: Run 'npm install' in your terminal.
2. Start: Run 'npm start'. The server lives at http://localhost:3000.
3. Test: Run 'npm test' to see all 6 integration tests pass.