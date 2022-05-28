// Styles
import styles from './App.module.scss';
// Components
import SearchBox from '../SearchBox/SearchBox';
import ResultsTable from '../ResultsTable/ResultsTable';

function App() {
  return (
    <main className={styles.App}>

      <SearchBox></SearchBox> 

      <ResultsTable></ResultsTable>

      {/* <MyList></MyList> */}

    </main>
  );
}

export default App;
