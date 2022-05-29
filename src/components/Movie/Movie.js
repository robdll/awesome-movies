import styles from './Movie.module.scss';
import {useDispatch} from 'react-redux';
import { fetchVideo } from '../../store/movieReducer'

function Movie({item, idx, cb1, cb2}) {

  const dispatch = useDispatch();

  const handleVideoClick = () =>{
    dispatch(fetchVideo(item.id));
  }

  const coverCell = <img className={styles.cover} src={item.poster_path} alt={`${item.title} cover`} />
  const titleCell = <div className={styles.title}><b>Title:</b> {item.title}</div>
  const actionsCell = <div className={styles.actions}>
    <img onClick={()=>cb1(item)} className={styles.svg} src="./star.svg" alt="favorite icon" />
    <img onClick={()=>cb2(item)} className={styles.svg} src="./watchLater.svg" alt="watchLater icon" />
    { item.video && <img onClick={handleVideoClick} className={styles.svg} src="./trailer.svg" alt="trailer icon" />}
  </div>
    return <div className={styles.Movie} key={idx}> 
      {coverCell}
      {titleCell}
      {actionsCell}
    </div>
}




export default Movie;
