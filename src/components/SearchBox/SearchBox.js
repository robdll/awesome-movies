import styles from './SearchBox.module.scss';
import { useState } from 'react';

import { useDispatch } from 'react-redux'
import { fetchMovies } from '../../store/movieReducer'

function SearchBox() {

  const dispatch = useDispatch()

  const PLACEHOLDER_DEFAULT = 'Search for a movie title';
  const [searchValue, setSearchValue] = useState('');
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER_DEFAULT);

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  
  const handleFocus = (e) => {
    setPlaceholder('')
  }

  const handleBlur = (e) => {
    if(searchValue === '') {
      setPlaceholder(PLACEHOLDER_DEFAULT)
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      startFetching()
    }
  }

  const startFetching = () => {
    if(searchValue !== '') {
      dispatch(fetchMovies(searchValue))
    } 
  }

  return (
    <div className={styles.searchBox}>
      <input 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        onKeyPress={handleKeyPress} 
        onChange={handleChange}
        className={styles.input} 
        value={searchValue}  
        placeholder={placeholder}>
        </input>
        <span className={styles.lens} onClick={startFetching}>
          <img src="./lens.png" alt='search icon'></img>
        </span>
    </div>
    );
  }
  
  export default SearchBox;
  