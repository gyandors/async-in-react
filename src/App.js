import './App.css';
import { useState, useEffect, useCallback } from 'react';
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
      let response = await fetch('https://swapi.dev/api/films');
      console.log(response);

      if (!response.ok) {
        throw new Error('Something went wrong. Retrying...');
      }

      const data = await response.json();
      // console.log(data);

      setMovies(
        data.results.map((r) => {
          return {
            id: r.episode_id,
            title: r.title,
            summary: r.opening_crawl,
            releaseDate: r.release_date,
          };
        })
      );
    } catch (error) {
      setError(error.message);
    }
    setLoader(false);
  }, []);

  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  let content = <h3>No movies found</h3>;
  if (movies.length > 0) content = <Movies movies={movies} />;
  if (error) content = <h3>{error}</h3>;
  if (loader) content = <h3>Loading...</h3>;

  function handleAddMovie(newMovie) {
    console.log(newMovie);
    setMovies([...movies, newMovie]);
  }

  return (
    <div className="app">
      <header className="app-header"></header>

      <main className="app-main">
        <section>
          <NewMovie onAddMovie={handleAddMovie} />
        </section>
        <section>
          <button onClick={handleFetchMovies}>Fetch</button>
        </section>
        <section>{content}</section>
      </main>

      <footer className="app-footer"></footer>
    </div>
  );
}

export default App;
