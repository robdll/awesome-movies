import styles from './ResultsTable.module.scss';
import { useSelector } from 'react-redux';

function ResultsTable() {
  const results = useSelector((state) => state.movieState.movies);
  const rows = results.map( (item, idx) => {
    const coverCell = <img className={styles.cover} src={item.poster_path} alt={`${item.title} cover`} />
    const titleCell = <div className={styles.title}><b>Title:</b> {item.title}</div>
    const actionsCell = <div className={styles.actions}>
      <img className={styles.svg} src="/star.svg" alt="favorite icon" />
      <img className={styles.svg} src="/watchLater.svg" alt="watchLater icon" />
    </div>
    return <div className={styles.resultRow} key={idx}> 
      {coverCell}
      {titleCell}
      {actionsCell}
    </div>
  })
  return (
    <article className={styles.resultsTable}>
        {rows}
    </article>
  );
}

export default ResultsTable;
