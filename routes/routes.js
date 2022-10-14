import express from "express"
import { getMovie, createMovie, deleteMovie, updateMovie, displayMovies} from "../controllers/controllers.js"

const router = express.Router();

router.get('/movies', displayMovies)
router.post('/movies', createMovie)
router.get('/movies/:id', getMovie)
router.delete('/movies/:id', deleteMovie)
router.put('/movies/:id', updateMovie)
export default router