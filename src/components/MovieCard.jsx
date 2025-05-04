import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'  

export default function MovieCard({ movie }) {
  console.log(movie.id)
  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card style={{ height: '100%' }}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <Card.Body>
            {/* Tornando o título do filme clicável para redirecionar para a página de detalhes */}
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text style={{ fontSize: '0.9rem' }}>
              {movie.overview.length > 200
              ? movie.overview.substring(0, 200) + '...'
              : movie.overview}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}