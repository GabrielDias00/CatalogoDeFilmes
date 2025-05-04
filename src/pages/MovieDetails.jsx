import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '../service/api'

export default function MovieDetails() {
  const { id } = useParams(); // Para pegar o id do filme da URL
  const [movieDetails, setMovieDetails] = useState(null)

  // Função para buscar detalhes do filme
  useEffect(() => {
    async function fetchDetails() {
      const details = await getMovieDetails(id);
      setMovieDetails(details);
    }

    fetchDetails()
  }, [id])

  if (!movieDetails) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mt-4">
      <h2>{movieDetails.title}</h2>
      <p><strong>Lançamento:</strong> {movieDetails.release_date}</p>
      <p><strong>Sinopse:</strong> {movieDetails.overview}</p>
      <p><strong>Diretor:</strong> {movieDetails.director}</p>
      {}
      <img 
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} 
        alt={movieDetails.title} 
        className="img-fluid"
      />
    </div>
  )
}