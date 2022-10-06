import { useEffect, useState, useRef } from 'react';
import './Viz.css'

// loads tableau visualizations and initiates the Embedding v3 API https://help.tableau.com/current/api/embedding_api/en-us/index.html
function Viz(props) {
  
  const vizRef = useRef(null); // useRef accesses DOM nodes created with the render method https://reactjs.org/docs/refs-and-the-dom.html
  const [loaded, setLoaded] = useState(false);
  const [jwt, setJWT] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImlzcyI6IjZjYzYwMDY5LTU3ZGEtNGYwMC1hYjVlLTdkODFkMTljM2FhMCIsImtpZCI6ImI0ZDAzZWY5LTNjNjAtNGRjMC1hZjZmLWE0M2I1M2ViNTgyNiJ9.eyJzdWIiOiJzLnByaWNlQHNhbGVzZm9yY2UuY29tIiwiYXVkIjoidGFibGVhdSIsIm5iZiI6MTY2NTA4Mjg4OCwianRpIjoiMTY2NTA4Mjk4ODA2NCIsImlzcyI6IjZjYzYwMDY5LTU3ZGEtNGYwMC1hYjVlLTdkODFkMTljM2FhMCIsInNjcCI6WyJ0YWJsZWF1OnZpZXdzOmVtYmVkIl0sImV4cCI6MTY2NTA4MzA4OH0.LtRgfFJ7MLPvopaYRkJY0B3NPqzKEDgnDthou58Mbz4');

  useEffect(() => {
    setLoaded(true);
    return () => {
      setLoaded(false);
    };
  }, [loaded]);

  useEffect(() => {
    if (loaded && !props.vizObj) {
      props.setVizObj(vizRef.current);
    }

    return () => {
      if (props.vizObj) {
        props.setVizObj(null);
      }
    };
  }, [props.vizObj, loaded]);

  // useEffect(() => { 
  //   props.setVizObj(vizRef.current); // set props.vizObj to the <tableau-viz> element
  // },[]); // runs once at first render

  useEffect(() => {
    if (props.vizObj) { // if state has an initialized Tableau viz
      props.vizObj.addEventListener('firstinteractive', async (event) => { // add the custom event listener to <tableau-viz>
        props.setInteractive(true); // update state to indicate that the Tableau viz is interactive
      });

      // return function removes listener on unmount to avoid memory leaks
      return () => props.vizObj.removeEventListener('firstinteractive', async (event) => {
        props.setInteractive(true);
      });
    }
  }, [props.vizObj]); // runs when props.vizObj state is set

  // const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImlzcyI6IjZjYzYwMDY5LTU3ZGEtNGYwMC1hYjVlLTdkODFkMTljM2FhMCIsImtpZCI6ImI0ZDAzZWY5LTNjNjAtNGRjMC1hZjZmLWE0M2I1M2ViNTgyNiJ9.eyJzdWIiOiJzLnByaWNlQHNhbGVzZm9yY2UuY29tIiwiYXVkIjoidGFibGVhdSIsIm5iZiI6MTY2NTA4Mjg4OCwianRpIjoiMTY2NTA4Mjk4ODA2NCIsImlzcyI6IjZjYzYwMDY5LTU3ZGEtNGYwMC1hYjVlLTdkODFkMTljM2FhMCIsInNjcCI6WyJ0YWJsZWF1OnZpZXdzOmVtYmVkIl0sImV4cCI6MTY2NTA4MzA4OH0.LtRgfFJ7MLPvopaYRkJY0B3NPqzKEDgnDthou58Mbz4';

  return (
    <div 
      className='VizDiv'
      style={props.articleStyle}
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
