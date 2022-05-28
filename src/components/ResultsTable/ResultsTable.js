import styles from './ResultsTable.module.scss';
import { useSelector } from 'react-redux';

function ResultsTable() {
  const results = useSelector((state) => state.movieState.movies);
  console.log(results)
  const rows = results.map( item => {
    const coverCell = <img className={styles.cover} src={item.poster_path} alt={`${item.title} cover`} />
    const titleCell = <div className={styles.title}>{item.title}</div>
    const watchCell = <div className={styles.action}>icon</div>
    const faveCell = <div className={styles.action}>icon</div>
    return <div className={styles.resultRow}> 
      {coverCell}
      {titleCell}
      {watchCell}
      {faveCell}
    </div>
  })
  return (
    <article className={styles.resultsTable}>
        {rows}
    </article>
  );
}

export default ResultsTable;
