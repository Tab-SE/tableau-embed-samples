import { useState, useEffect, useRef } from 'react';
import { encode } from '../../../libs/connected_apps'

// loads tableau visualizations and initiates the Embedding v3 API https://help.tableau.com/current/api/embedding_api/en-us/index.html
function Viz(props) {
  const [sizing, setSizing] = useState({height: 1, width: 1});
  
  const vizRef = useRef(null); // useRef accesses DOM nodes created with the render method https://reactjs.org/docs/refs-and-the-dom.html

  useEffect(() => { 
    props.setVizObj(vizRef.current); // set props.vizObj to the <tableau-viz> element
  },[]); // runs once at first render

  useEffect(() => {
    if (props.vizObj) { // if state has an initialized Tableau viz
      props.vizObj.addEventListener('firstinteractive', async (event) => { // add the custom event listener to <tableau-viz>
        props.setInteractive(true); // update state to indicate that the Tableau viz is interactive
      });

      // return function removes listener on component unmount to avoid memory leaks
      return () => props.vizObj.removeEventListener('firstinteractive', async (event) => {
        props.setInteractive(true);
      });
    }
  }, [props.vizObj]); // runs when props.vizObj state is set

  useEffect(() => {
    if (props.interactive) {
      setTimeout(() => {
        setSizing({height: props.articleStyle.height, width: props.articleStyle.width});
      }, 750)
    }
  }, [props.interactive])

  const jwt = encode(props.env_vars);

  return (
    <div 
      className='VizDiv'
      style={{
        height: sizing.height,
        width: sizing.width
      }}
    >
      <tableau-viz 
        ref={vizRef}
        id="tableauViz"       
        src={props.vizUrl}
        height={props.height}
        width={props.width}
        device={props.device}
        hide-tabs={props.hideTabs ? true : false}
        token={jwt}
      />
    </div>
  );
}

export default Viz;
