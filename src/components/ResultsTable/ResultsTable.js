import styles from './ResultsTable.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';
import Movie from '../Movie/Movie';
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
    return <Movie item={item} cb1={handleFavoriteClick} cb2={handleWatchLaterClick} key={idx}></Movie>
  })

  return isLoadingResults ? 
    <Loader />
    : (
      <article className={styles.resultsTable} data-testid="result-table">
          {rows}
      </article>
    );
}

export default ResultsTable;
