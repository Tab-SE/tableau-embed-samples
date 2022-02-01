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
      props.vizObj.addEventListener('firstinteractive', async (event) => { // add the custom event listener to <tableau-viz>
        setInteractive(true);
      });

      return () => props.vizObj.removeEventListener('firstinteractive', async (event) => { // return function removes listener to avoid memory leaks
        setInteractive(true);
      });
    }
  }, [props.vizObj]); // runs when props.vizObj state is set

  const parentStyle = { // sets height and width for viz parent elements
    height: props.toolbar && props.toolbar !== 'hidden' ? props.height + 27 : props.height, // additional toolbar height if shown
    width: props.width,
  }

  return (
    <article className='Viz' style={parentStyle}>
      <img 
        src={logo} 
        className={`App-logo ${!interactive ? 'active' : 'inactive'}`} 
        alt="logo" 
        height={`${parentStyle.height}`} 
        width={`${props.width}`}
      />
      <div 
        className={`VizDiv ${interactive ? 'active' : 'inactive'}`}
        style={parentStyle}
      >
        <tableau-viz 
          ref={vizRef}
          id="tableauViz"       
          src={props.vizUrl}
          height={props.height}
          width={props.width}
          device={props.device}
          hide-tabs={props.hideTabs ? true : false}
        />
      </div>
    </article>
  );
}

export default Viz;
