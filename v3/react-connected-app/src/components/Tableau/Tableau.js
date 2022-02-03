import { useState } from "react";
import { Helmet } from "react-helmet"; // adds <script> tag to the document head
import Viz from "./Viz/Viz.js";
import Animation from "./Animation/Animation.js"
import "./Tableau.css"

// higher-order component composing multiple components into a single <Tableau/> component
function Tableau(props) {
  // lifting state to share it with non <Viz/> components (e.g. custom toolbar)
  const [vizObj, setVizObj] = useState(undefined); // "viz object" providing access to Tableau API methods
  const [loaded, setLoaded] = useState(false);  // load or render state
  const [interactive, setInteractive] = useState(false); // viz interactivity state

  const articleStyle = { // sets height and width for viz parent elements
    height: props.toolbar && props.toolbar !== 'hidden' ? props.height + 27 : props.height, // additional height for toolbar (if displayed)
    width: props.width,
  };

  return (
    <>
      <Helmet> 
        <script type="module" src="https://embedding.tableauusercontent.com/tableau.embedding.3.0.0.min.js" async></script>
      </Helmet>
      <article className='vizArticle' style={articleStyle}>
        <Animation
          interactive={interactive}
          articleStyle={articleStyle}
        />
        <Viz
          vizObj={vizObj}
          setVizObj={setVizObj}
          loaded={loaded}
          setLoaded={setLoaded}
          interactive={interactive}
          articleStyle={articleStyle}
          setInteractive={setInteractive}
          vizUrl={props.vizUrl}
          height={props.height}
          width={props.width}
          hideTabs={props.hideTabs}
          device={props.device}
          toolbar={props.toolbar}
        />
      </article>
    </>
  );
}

export default Tableau;
