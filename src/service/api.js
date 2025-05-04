const baseUrl = 'https://api.themoviedb.org/3'
const token = import.meta.env.VITE_API_KEY

export async function getTopRatedMovies(pages = 3) {
  try {
    let allMovies = []

    for (let i = 1; i <= pages; i++) {
    const response = await fetch(`${baseUrl}/movie/top_rated?language=pt-BR&page=${i}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar filmes')
    }

    const data = await response.json()
    allMovies = allMovies.concat(data.results)
  }
    return allMovies
  } catch (error) {
    console.error('Erro na requisição:', error.message)
    return []
  }
}

// Busca os gêneros disponíveis
export async function getGenres() {
  try {
    const response = await fetch(`${baseUrl}/genre/movie/list?language=pt-BR`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar gêneros')
    }

    const data = await response.json()
    return data.genres 
  } catch (error) {
    console.error('Erro na requisição de gêneros:', error.message)
    return []
  }
}

// Compila filmes com gêneros
export async function getMovies() {
  const [movies, genres] = await Promise.all([
    getTopRatedMovies(3),
    getGenres()
  ])

  // Cria um map de id e passa para o nome do gênero
  const genreMap = {}
  genres.forEach((genre) => {
    genreMap[genre.id] = genre.name
  })

  // Adiciona os nomes dos gêneros aos filmes 
  const moviesWithGenres = movies.map((movie) => ({
    ...movie, 
    genre_names: movie.genre_ids.map(id => genreMap[id])
  }))

  return moviesWithGenres
}

// Função para buscar os detalhes do filme

export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(`${baseUrl}/movie/${movieId}?language=pt-BR`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do filme')
    }

    const data = await response.json()

    // Busca o nome do diretor
    const director =
      data.credits?.crew?.find((person) => person.job === 'Director')?.name ||
      'Não disponível'

    return {
      ...data,
      director, // Adiciona o nome do diretor aos dados do filme
    }
  } catch (error) {
    console.error('Erro na requisição de detalhes do filme:', error.message)
    return {}
  }
}