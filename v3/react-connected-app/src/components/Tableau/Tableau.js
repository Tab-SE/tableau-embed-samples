import { useState } from "react";
import { Helmet } from "react-helmet"; // adds <script> tag to the document head
import { useSpring, animated } from "react-spring"; // physics based animation library
import Viz from "./Viz/Viz.js";
import Animation from "./Animation/Animation.js";
import "./Tableau.css";

// higher-order component composing multiple components into a single <Tableau/> component
function Tableau(props) {
  // lifting state to share it with non <Viz/> components (e.g. custom toolbar)
  const [vizObj, setVizObj] = useState(undefined); // "viz object" providing access to Tableau API methods
  const [interactive, setInteractive] = useState(false); // viz interactivity state

  const articleStyle = { // sets height and width for viz parent elements
    height: props.toolbar && props.toolbar !== 'hidden' ? props.height + 27 : props.height, // additional height for toolbar (if displayed)
    width: props.width,
  };  

  const animationTransition = useSpring({
    clip: interactive ? 'rect(0 0 0 0)' : 'rect(1 1 1 1)', 
    clipPath: interactive ? 'inset(50%)' : 'inset(0%)',
    position: interactive ? 'absolute' : 'static',
    height: interactive ? 1 : articleStyle.height,
    width: interactive ? 1 : articleStyle.width,
    overflow: interactive ? 'hidden' : 'visible',
    whiteSpace: interactive ? 'nowrap' : 'normal',
  });

  const vizTransition = useSpring({ 
    clip: !interactive ? 'rect(0 0 0 0)' : 'rect(1 1 1 1)', 
    clipPath: !interactive ? 'inset(50%)' : 'inset(0%)',
    position: !interactive ? 'absolute' : 'static',
    height: !interactive ? 1 : articleStyle.height,
    width: !interactive ? 1 : articleStyle.width,
    overflow: !interactive ? 'hidden' : 'visible',
    whiteSpace: !interactive ? 'nowrap' : 'normal',
    config: { duration: 750 }
  });

  return (
    <>
      <Helmet> 
        <script type="module" src="https://embedding.tableauusercontent.com/tableau.embedding.3.0.0.min.js" async></script>
      </Helmet>
      <article className='vizArticle' style={articleStyle}>
        <animated.div style={animationTransition} className='animationDiv'>
          <Animation/>
        </animated.div>
        <animated.div style={vizTransition}>
          <Viz
            vizObj={vizObj}
            setVizObj={setVizObj}
            interactive={interactive}
            setInteractive={setInteractive}
            articleStyle={articleStyle}
            vizUrl={props.vizUrl}
            height={props.height}
            width={props.width}
            hideTabs={props.hideTabs}
            device={props.device}
            toolbar={props.toolbar}
          />
        </animated.div>
      </article>
    </>
  );
}

export default Tableau;
