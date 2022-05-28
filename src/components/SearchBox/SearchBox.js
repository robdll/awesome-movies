import styles from './SearchBox.module.scss';
import { useState } from 'react';

import { useDispatch } from 'react-redux'
import { fetchMovies } from '../../store/movieReducer'

function SearchBox() {

  const dispatch = useDispatch()

  const PLACEHOLDER_DEFAULT = 'Search for a movie title';
  const [searchValue, setSearchValue] = useState('');
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER_DEFAULT);
  const [inputClasses, setInputClasses] = useState(`${styles.input}`);

  const handleClick = (e) => {
    setSearchValue(e.target.value)
  }
  
  const handleFocus = (e) => {
    setPlaceholder('')
    setInputClasses(`${styles.input} ${styles.alignLeft}`);
  }

  const handleBlur = (e) => {
    if(searchValue === '') {
      setPlaceholder(PLACEHOLDER_DEFAULT)
      setInputClasses(`${styles.input}`);
    } else {
      dispatch(fetchMovies(searchValue))
    }
  }

  return (
    <div className={styles.searchBox}>
      <input onFocus={handleFocus} onBlur={handleBlur} className={inputClasses} value={searchValue} onChange={handleClick} placeholder={placeholder}></input>
    </div>
    );
  }
  
  export default SearchBox;
  