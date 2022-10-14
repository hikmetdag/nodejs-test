import { v4 as uuidv4 } from 'uuid'
uuidv4()

let movies = []

export const displayMovies = (req, res) => {
    if (!movies.length) {
        return res.status(404).json({msg:'No movie in database'})
    }
    res.status(200).json(movies)
}

export const createMovie = (req, res) => {
    const movie = req.body
    const { title, director, release_date } = req.body
    const newMovie = {
        title: `${title}`,
        director: `${director}`,
        release_date: `${release_date}`,
    }
    const movieWithId = { ...newMovie, id: uuidv4() }
    if (!title || !director || !release_date)
        throw res.status(400).json({ msg: 'Make sure that you input followings: title, director, release_date' })
    movies.push(movieWithId)
    res.status(201).json({msg:`${movie.title} is added to the database`})
}

export const getMovie = (req, res) => {
    const { id } = req.params
    const findMovie = movies.find((movie) => id == movie.id)
    if (!findMovie) throw res.status(400).json({msg:'Please put accurate input'})
    res.status(200).json(findMovie)
}

export const deleteMovie = (req, res) => {
    const { id } = req.params
    const deletedMovie = movies.find((movie) => id == movie.id)
    if (!deletedMovie) throw res.status(400).json({msg:'No movie with this id available'})
    movies = movies.filter((movie) => id !== movie.id)
    res.status(200).json({msg:`Movie with this id ${id} is deleted`})
}

export const updateMovie = (req, res) => {
    const { id } = req.params
    const { title, director, release_date } = req.body
    const updateMovie = movies.find((movie) => id == movie.id)
    if (!updateMovie) throw res.status(400).json({msg:`No movie with this id ${id}`})
    if (!title || !director || !release_date)
        throw res.status(400).json({msg:'To update you must input followings: title, director, release_date'})

    updateMovie.title = title
    updateMovie.director = director
    updateMovie.release_date = release_date
    res.status(200).json({msg:`Movie with this id ${id} is updated`})

}