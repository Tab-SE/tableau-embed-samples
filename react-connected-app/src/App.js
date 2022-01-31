
import Tableau from './components/Tableau/Tableau.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <header>
          <h1>Tableau Connected App: React</h1>
        </header>
        <section>
          <Tableau
            vizUrl="https://public.tableau.com/views/QuarterlyCashflow/QUARTERLYCASHFLOW?:display_count=n&:showVizHome=no&embed=yes"
          />
          <p>
            Edit <code>src/App.js</code> to embed your viz and save to reload.
          </p>
          <a
            className="App-link"
            href="https://help.tableau.com/current/api/embedding_api/en-us/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn to embed a Tableau Viz
          </a>
        </section>
      </div>
    </div>
  );
}

export default App;
