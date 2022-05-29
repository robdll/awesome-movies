import styles from './Movie.module.scss';

function Movie({item, idx, cb1, cb2}) {
  const coverCell = <img className={styles.cover} src={item.poster_path} alt={`${item.title} cover`} />
  const titleCell = <div className={styles.title}><b>Title:</b> {item.title}</div>
  const actionsCell = <div className={styles.actions}>
    <img onClick={()=>cb1(item)} className={styles.svg} src="./star.svg" alt="favorite icon" />
    <img onClick={()=>cb2(item)} className={styles.svg} src="./watchLater.svg" alt="watchLater icon" />
  </div>
    return <div className={styles.Movie} key={idx}> 
      {coverCell}
      {titleCell}
      {actionsCell}
    </div>
}

export default Movie;
