
# Movie Explorer API

This backend Movie Explorer lets users search for movies and manage a personal favorites list.  
It uses a **custom-built 24-hour cache** to make repeated searches instant and protect API limits.  
The system follows an **MVC structure**, is fully tested with **Jest & Supertest**, and is optimized for use by any web or mobile frontend.

---

## Tech I Used
- **Node.js & Express** – The foundation of the server  
- **Axios** – Communication with TMDB API  
- **Jest & Supertest** – Integration tests to ensure features work correctly  
- **ES Modules** – Modern import/export syntax for a clean codebase  

---

## Engineering Decisions

1. **Backend Focus**  
   Focused 100% on API architecture rather than a UI. Used Postman to validate endpoints with standard JSON responses and status codes.

2. **24-Hour Cache**  
   Movie data (titles, plots, years) is mostly static. A long TTL maximizes performance and reduces unnecessary TMDB API calls.

3. **Result Limiting (Top 50)**  
   Limits search results to 50 to keep response times fast and memory usage low.

4. **Environment Awareness**  
   The server checks `process.env.NODE_ENV` to avoid starting a real network listener during tests, allowing Jest to run in isolation.

5. **Input Validation**  
   Strict validation ensures a better user experience with clear `400 Bad Request` errors for missing or invalid data.

---

## Project Structure
```

src/
├─ routes/        # Defines the URL paths
├─ controllers/   # Handles the logic and TMDB API calls
├─ cache.js       # Memory-based caching logic
tests/             # Automated integration tests

````

---

## API Endpoints
- **GET** `/movies/search?text=...` – Search for a movie title (optional `year`, max 50 results)  
- **GET** `/movies/:id` – Get full details for a specific movie  
- **GET** `/favorites` – See all favorite movies  
- **POST** `/favorites` – Add a movie to favorites (JSON body required)  
- **DELETE** `/favorites/:id` – Remove a movie from favorites  

---

## How to Run It

1. Install dependencies:
```bash
npm install
````

2. Start the server:

```bash
npm start
```

Server runs at: `http://localhost:3000`

3. Run tests:

```bash
npm test
```

All integration tests (6 tests) should pass.

---

This backend is ready to be integrated with any web or mobile frontend and demonstrates a clean, tested, and performance-optimized API design.

