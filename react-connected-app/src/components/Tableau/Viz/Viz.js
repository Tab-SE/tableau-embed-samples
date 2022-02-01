import { useState, useEffect, useRef } from 'react';
import './Viz.css'
import logo from '../../../assets/images/logo.svg';

function Viz(props) {
  const [loaded, setLoaded] = useState(false);  // load or render state
  const [interactive, setInteractive] = useState(false); // viz interactivity state
  
  const vizRef = useRef(null); // useRef accesses DOM nodes created with the render method https://reactjs.org/docs/refs-and-the-dom.html

  useEffect(() => { 
    setLoaded(true);
  },[]); // runs once at first render

  useEffect(() => {
    if (loaded) {
      props.setVizObj(vizRef.current); // set props.vizObj to the <tableau-viz> element
    }
  },[loaded]); // runs when loaded state is set

  useEffect(() => {
    if (props.vizObj) {
      onFirstInteractive(props.vizObj); // pass props.vizObj as a parameter (set as <tableau-viz>)
    }
  }, [props.vizObj]); // runs when props.vizObj state is set

  const onFirstInteractive = (vizObj) => {
    vizObj.addEventListener('firstinteractive', async (event) => { // add the custom event listener to <tableau-viz>
      setInteractive(true);
    });
  }

  return (
    <article>
      <img src={logo} className={`App-logo ${!interactive ? 'active' : 'inactive'}`} alt="logo" />
      <div 
        className={`${interactive ? 'active' : 'inactive'}`}
      >
        <tableau-viz 
          ref={vizRef}
          id="tableauViz"       
          src={props.vizUrl}
          height={props.height}
          width={props.width}
          hideTabs={props.hideTabs}
          device={props.device}
        />
      </div>
    </article>
  );
}

export default Viz;
