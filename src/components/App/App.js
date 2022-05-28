// Styles
import styles from './App.module.scss';
// Components
import SearchBox from '../SearchBox/SearchBox';
import ResultsTable from '../ResultsTable/ResultsTable';
import Tabs from '../Tabs/Tabs';

function App() {
  return (
    <main className={styles.App}>
      <h1 className={styles.mainTitle}>AwesomeMovies</h1>
      <SearchBox></SearchBox> 
      <Tabs/> 
      <ResultsTable/>
    </main>
  );
}

export default App;
