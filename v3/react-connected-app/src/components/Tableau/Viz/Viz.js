import { useState, useEffect, useRef } from 'react';
import './Viz.css'
import logo from '../../../assets/images/logo.svg';

// loads tableau visualizations and initiates the Embedding v3 API https://help.tableau.com/current/api/embedding_api/en-us/index.html
function Viz(props) {
  
  const vizRef = useRef(null); // useRef accesses DOM nodes created with the render method https://reactjs.org/docs/refs-and-the-dom.html

  useEffect(() => { 
    props.setLoaded(true);
  },[]); // runs once at first render

  useEffect(() => {
    if (props.loaded) {
      props.setVizObj(vizRef.current); // set props.vizObj to the <tableau-viz> element
    }
  },[props.loaded]); // runs when loaded state is set

  useEffect(() => {
    if (props.vizObj) {
      props.vizObj.addEventListener('firstinteractive', async (event) => { // add the custom event listener to <tableau-viz>
        props.setInteractive(true);
      });

      return () => props.vizObj.removeEventListener('firstinteractive', async (event) => { // return function removes listener on unmount to avoid memory leaks
        props.setInteractive(true);
      });
    }
  }, [props.vizObj]); // runs when props.vizObj state is set

  const vizParent = { // sets height and width for viz parent elements
    height: props.toolbar && props.toolbar !== 'hidden' ? props.height + 27 : props.height, // additional height for toolbar (if displayed)
    width: props.width,
  };

  return (
    <article className='Viz' style={vizParent}>
      <img 
        src={logo} 
        className={`App-logo ${!props.interactive ? 'active' : 'inactive'}`} 
        alt="logo" 
        height={`${vizParent.height}`} 
        width={`${vizParent.width}`}
      />
      <div 
        className={`VizDiv ${props.interactive ? 'active' : 'inactive'}`}
        style={vizParent}
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
