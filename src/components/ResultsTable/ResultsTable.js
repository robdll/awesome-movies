import styles from './ResultsTable.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';
import { addFavorite, addWatchLater } from '../../store/movieReducer'

function ResultsTable() {

  const dispatch = useDispatch()
  const {movies, favorites, watchLater} = useSelector((state) => state.movieState);
  const tab = useSelector((state) => state.movieState.tab);
  const isLoadingResults = useSelector((state) => state.movieState.isLoading);
  
  const results = tab === `favorite` ? favorites
    : tab === `watchlater` ?  watchLater
    : movies;
    
  const handleFavoriteClick = (item) => {
      dispatch(addFavorite(item))
  }

  const handleWatchLaterClick = (item) => {
    dispatch(addWatchLater(item))
  }

  const rows = results.map( (item, idx) => {
    const coverCell = <img className={styles.cover} src={item.poster_path} alt={`${item.title} cover`} />
    const titleCell = <div className={styles.title}><b>Title:</b> {item.title}</div>
    const actionsCell = <div className={styles.actions}>
      <img onClick={()=>handleFavoriteClick(item)} className={styles.svg} src="/star.svg" alt="favorite icon" />
      <img onClick={()=>handleWatchLaterClick(item)} className={styles.svg} src="/watchLater.svg" alt="watchLater icon" />
    </div>
    return <div className={styles.resultRow} key={idx}> 
      {coverCell}
      {titleCell}
      {actionsCell}
    </div>
  })
  return isLoadingResults ? 
    <Loader />
    : (
      <article className={styles.resultsTable}>
          {rows}
      </article>
    );
}

export default ResultsTable;
