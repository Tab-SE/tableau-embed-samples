import { useState, useEffect, useRef } from 'react';
import './Viz.css'
import logo from '../../../assets/images/logo.svg';

function Viz(props) {
  const [interactive, setInteractive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const vizRef = useRef(null);

  useEffect(() => { // runs once at first render
    setLoaded(true);
  },[]);

  useEffect(() => {
    if (loaded) {
      const embed = new Promise((resolve, reject) => {
        props.setVizObj(vizRef.current);
          // viz = vizRef.current;
          // onFirstInteractive(viz);
        resolve(props.vizObj);
        reject(`Error loading interactive visualization`);
      }).then(
        (vizObj) => {
          console.log('vizObj:', vizObj)
          onFirstInteractive(vizObj);
        },
        (err) => {
          new Error(err);
        }
      );
    }
  },[loaded]);

  const onFirstInteractive = (vizObj) => {
    vizObj.addEventListener('firstinteractive', async (event) => {
      setInteractive(!interactive);
      console.count('interactive')
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
