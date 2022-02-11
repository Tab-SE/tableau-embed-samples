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

  // CSS is passed to react-spring so that transitions behave gradually via spring based animation
  // Accessibly hiding elements is necessary for viz loading https://css-tricks.com/comparing-various-ways-to-hide-things-in-css/
  const vizTransition = useSpring({ 
    clip: !interactive ? 'rect(0 0 0 0)' : 'rect(1 1 1 1)', // cuts the element so it disappears
    clipPath: !interactive ? 'circle(0%)' : 'circle(100%)', // replaces clip on modern browsers
    position: !interactive ? 'absolute' : 'static', // remove the element from document flow
    height: !interactive ? 1 : articleStyle.height, // shortest possible height still accessible to screen readers
    width: !interactive ? 1 : articleStyle.width, // shortest possible width still accessible to screen readers
    overflow: !interactive ? 'hidden' : 'visible', // avoids element overflowing
    whiteSpace: !interactive ? 'nowrap' : 'normal', // avoids removing empty spaces on screen readers
    opacity: !interactive ? 0 : 1, // degree to which content behind an element is hidden
    top: '50%', // vertically centers absolute elements - not animated
    right: '50%', // horizontally centers absolute elements - not animated
    config: { duration: 1000 }, // makes the transition smoother
    delay: 750, // short delay to display "Done." as load text before transitioning
  });

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
        <animated.div style={vizTransition} className='vizTransition'>
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
            layouts={{
              desktop: { height: 750, width: 1400},
              tablet: {},
              phone: {}
            }}
          />
        </animated.div>
      </article>
    </>
  );
}

export default Tableau;
