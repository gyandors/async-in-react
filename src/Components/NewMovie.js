import { useRef } from 'react';

export default function NewMovie(props) {
  const titleRef = useRef();
  const summaryRef = useRef();
  const dateRef = useRef();

  function handleAddMovie(event) {
    event.preventDefault();
    props.onAddMovie({
      id: Date.now(),
      title: titleRef.current.value,
      summary: summaryRef.current.value,
      releaseDate: dateRef.current.value,
    });
  }

  return (
    <form onSubmit={handleAddMovie}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={titleRef} />

      <label htmlFor="summary">Summary</label>
      <textarea name="summary" id="summary" ref={summaryRef}></textarea>

      <label htmlFor="release-date"> Release Date</label>
      <input type="date" id="release-date" ref={dateRef} />

      <button type="submit">Add Movie</button>
    </form>
  );
}
