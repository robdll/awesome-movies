// Styles
import styles from './Tabs.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { tabSelection } from '../../store/movieReducer'

function Tabs() {

  const dispatch = useDispatch()
  const tab = useSelector((state) => state.movieState.tab);

  const handleClick = (section)=> {
    if(tab !== section) {
      dispatch(tabSelection(section))
    }
  }

  return (
    <article className={styles.Tabs}>
      <div className={`${styles.tab} ${tab === 'search'? styles.active: ''}`} onClick={()=>handleClick('search')}>Search</div>
      <div className={`${styles.tab} ${tab === 'watchlater'? styles.active: ''}`} onClick={()=>handleClick('watchlater')}>Watch Later</div>
      <div className={`${styles.tab} ${tab === 'favorite'? styles.active: ''}`} onClick={()=>handleClick('favorite')}>Favorites</div>
    </article>
  );
}

export default Tabs;
