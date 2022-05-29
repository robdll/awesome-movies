import styles from './Modal.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import { toggleModal } from '../../store/movieReducer'

function Modal() {

  const dispatch = useDispatch();
  const {isLoadingTrailer, trailer} = useSelector((state) => state.movieState);
  const handleClick = () =>{
    dispatch(toggleModal());
  }

  return <div className={styles.Modal}>
    <div className={styles.modalContent}>
      <span onClick={handleClick} className={styles.close}>&times;</span>
      { isLoadingTrailer 
        ? <p>Loading..</p>
        : <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
      }
    </div>
  </div>
}

export default Modal;
