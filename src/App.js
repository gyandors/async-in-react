import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Button, Container } from 'react-bootstrap';
import Movies from './Components/Movies';
import NewMovie from './Components/NewMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  //Using fetch() method
  /*function handleFetchMovies() {
    fetch('https://swapi.dev/api/films').then((response) => {
      console.log(response);
      response.json().then((data) => {
        console.log(data);
        // console.log(data.results);
        const updatedMovies = data.results.map((r) => {
          return {
            id: r.episode_id,
            title: r.title,
            summary: r.opening_crawl,
            releaseDate: r.release_date,
          };
        });
        setMovies(updatedMovies);
      });
    });
  }*/

  //Using axios library
  /*function handleFetchMovies() {
    axios.get('https://swapi.dev/api/films').then((response) => {
      console.log(response.data);
      // console.log(response.data.results);

      setMovies(
        response.data.results.map((r) => {
          return {
            id: r.episode_id,
            title: r.title,
            summary: r.opening_crawl,
            releaseDate: r.release_date,
          };
        })
      );
    });
  }*/

  //Handling promise in async/await and using try and catch
  const handleFetchMovies = useCallback(async () => {
    setLoader(true);

    try {
      let response = await fetch(
        'https://test-api-cd004-default-rtdb.firebaseio.com/films.json'
      );
      // console.log(response);

      if (!response.ok) {
        throw new Error('Something went wrong. Retry...');
      }

      const data = await response.json();
      // console.log(data);

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          summary: data[key].summary,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setLoader(false);
  }, []);

  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  const handleAddMovie = useCallback(async (newMovie) => {
    const response = await fetch(
      'https://test-api-cd004-default-rtdb.firebaseio.com/films.json',
      {
        method: 'POST',
        body: JSON.stringify(newMovie),
      }
    );
    console.log(response);

    setMovies((prevMovies) => [...prevMovies, newMovie]);
  }, []);

  const handleDeleteMovie = async (movieId) => {
    console.log(movieId);
    const response = await fetch(
      `https://test-api-cd004-default-rtdb.firebaseio.com/films/${movieId}.json`,
      {
        method: 'DELETE',
      }
    );
    console.log(response);

    const updatedMovies = movies.filter((m) => m.id !== movieId);
    setMovies(updatedMovies);
  };

  let content = <h3>No movies found.</h3>;
  if (movies.length > 0)
    content = <Movies movies={movies} onDeleteMovie={handleDeleteMovie} />;
  if (error) content = <h3>{error}</h3>;
  if (loader) content = <h3>Loading...</h3>;

  return (
    <Container className="mt-5 custom-container">
      <header className="app-header"></header>

      <main className="app-main">
        <section>
          <NewMovie onAddMovie={handleAddMovie} />
        </section>
        <section className="text-center mt-5 mb-2">
          <Button onClick={handleFetchMovies}>Fetch</Button>
        </section>
        <section>{content}</section>
      </main>

      <footer className="app-footer"></footer>
    </Container>
  );
}

export default App;
