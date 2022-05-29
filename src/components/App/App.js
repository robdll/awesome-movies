// Styles
import styles from './App.module.scss';
// Components
import SearchBox from '../SearchBox/SearchBox';
import ResultsTable from '../ResultsTable/ResultsTable';
import Tabs from '../Tabs/Tabs';
import Modal from '../Modal/Modal';

import {useSelector} from 'react-redux';

function App() {

  const modal = useSelector((state) => state.movieState.modal);

  return (
    <main className={styles.App}>
      <h1 className={styles.mainTitle}>AwesomeMovies</h1>
      <SearchBox></SearchBox> 
      <Tabs/> 
      <ResultsTable/>
      {modal && <Modal />}
    </main>
  );
}

export default App;
