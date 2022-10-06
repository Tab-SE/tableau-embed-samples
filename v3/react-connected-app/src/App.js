
import Tableau from './components/Tableau/Tableau.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="Main">
        <header>
          <h1>Tableau Connected App: <strong>React</strong></h1>
        </header>
        <section>
          <Tableau
            vizUrl="https://10ay.online.tableau.com/t/embeddedanalytics/views/QuarterlyCashflow/QUARTERLYCASHFLOW?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link"
            height={750}
            width={1400}
            toolbar="bottom"
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
      </main>
    </div>
  );
}

export default App;
