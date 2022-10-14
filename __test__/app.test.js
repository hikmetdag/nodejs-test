import app from "../app.js";
import { movies } from "../dataTest.js";
import supertest from "supertest";

const request = supertest(app);

describe("Pull Movies(GET)", () => {

  it("404 status code and error message when no movie in the database", async () => {
    const response = await request.get("/movies");
    expect(response.status).toBe(404);
    expect(response.body.msg).toEqual('No movie in database');
  });

  it("200 status code with pulling movies successfully", async () => {
    const movieStore = [];
    movies.forEach(async (movie) => {
      const res = await request.post("/movies").send(movie);
      movieStore.push(res.body);
    })
    const response = await request.get("/movies");
    expect(response.status).toBe(200);
  });

  // it("200 status code with the given id", async () => {
  //   const res = await request.post("/movies").send(movies[0]);
  //   const response = await request.get(`/movies/${res.body.id}`);
  //   expect(response.status).toBe(200);
  // });

  it("400 status code and error message with the given wrong id", async () => {
    const res = await request.post("/movies").send(movies[0]);

    const response = await request.get(`/movies/${res.body.id}mn`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Please put accurate input');
  });

});

describe("Create movie(POST)", () => {
  it("201 status code with proper inputs", async () => {
    const response = await request.post("/movies").send(movies[0]);
    expect(response.status).toBe(201);
  });

  it("400 status code and error message with missing inputs", async () => {
    const response = await request.post("/movies").send({
      title: "Movie 2",
      director: "Rob van Kruijsdijk"
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Make sure that you input followings: title, director, release_date');

  });
})

describe("Update movie(PUT)", () => {
  // it("200 status code with given id for updating", async () => {
  //   const res = await request.post("/movies").send(movies[0]);
  //   const updateMovie = {
  //     title: "Movie 10",
  //     director: "Rob van Kruijsdijk",
  //     release_date: "12-10-2022"
  //   };
  //   const response = await request
  //     .put(`/movies/${res.body.id}`)
  //     .send(updateMovie);
  //   expect(response.status).toBe(200);
  // });

  it("400 status code and error message with the given wrong id", async () => {
    const updateMovie = {
      title: "Movie 10",
      director: "Rob van Kruijsdijk",
      release_date: "12-10-2022"
    };
    const response = await request
      .put('/movies/12345')
      .send(updateMovie);
    expect(response.status).toBe(400);
  });
});

describe("Delete movie(DELETE)", () => {
  // it("200 status code with the given id", async () => {
  //   const res = await request.post("/movies").send(movies[0]);
  //   const response = await request.delete(`/movies/${res.body.id}`);
  //   expect(response.status).toBe(200);
  // });

  it("400 status code and error message with the given wrong id", async () => {
    const res = await request.post("/movies").send(movies[0]);
    const response = await request.delete(`/movies/${res.body.id}mn`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('No movie with this id available');
  });
});
