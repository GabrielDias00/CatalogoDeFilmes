import React, { useState, useEffect } from 'react'
import { getMovies, getGenres } from '../service/api'
import MovieCard from '../components/MovieCard'
import { Container, Row, Pagination, Button } from 'react-bootstrap'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const moviePerPage = 10

  // Busca os filmes  e gêneros apenas uma vez
  useEffect(() => {
    async function fetchData() {
      const [moviesData, genresData] = await Promise.all ([
        getMovies(),
        getGenres()
      ])
      setMovies(moviesData)
      console.log(moviesData)
      setGenres(genresData)
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
    fetchData()
  }, [page]) 

  // Filtra os filmes pelo gênero  e título 
    const filteredMovies = movies.filter(movie => {
    const matchesGenre = selectedGenre ? movie.genre_ids.includes(selectedGenre) : true
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesGenre && matchesSearch
  })

  // Paginação
  const indexOfLastMovie = page * moviePerPage
  const indexOfFirstMovie = indexOfLastMovie - moviePerPage
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)
  const totalPages = Math.ceil(filteredMovies.length / moviePerPage)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '1400px'}}>
      <h1 className="mb-3 text-center">Filmes que valem o replay</h1>

      {/* Campo de busca */}
      <div className="mb-3 text-center">
        <input
          type="text"
          placeholder="Buscar por filme..."
          className="form-control w-50 mx-auto"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setPage(1)
          }}
        />
      </div>

      {/* Filtros de Gênero */}
      <div className="mb-4 text-center">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenre === genre.id ? 'primary' : 'outline-primary'}
            size="sm"
            className="me-2 mb-2"
            onClick={() => {
              setSelectedGenre(genre.id)
              setPage(1)
            }}
          >
            {genre.name}
          </Button>
        ))}
        {selectedGenre && (
          <Button
            variant="danger"
            size="sm"
            className="ms-2 mb-2"
            onClick={() => {
              setSelectedGenre(null)
              setSearchTerm('')
              setPage(1)
            }}
          >
            Limpar Filtro
          </Button>
        )}
      </div>

      {/* Lista de Filmes */}
      <Row>
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Row>

      {/* Paginação */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={page === idx + 1}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          />
        </Pagination>
      </div>
    </Container>
  )
}