export default function Movies(props) {
  return (
    <ul>
      {props.movies.map((m) => {
        return (
          <li key={m.id}>
            <h1>{m.title}</h1>
            <p>{m.summary}</p>
            <h3>{m.releaseDate}</h3>
          </li>
        );
      })}
    </ul>
  );
}
