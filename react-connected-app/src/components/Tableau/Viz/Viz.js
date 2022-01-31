import { useState, useEffect, useRef } from 'react';
import './Viz.css'
import logo from '../../../assets/images/logo.svg';

function Viz(props) {
  const [interactive, setInteractive] = useState(false);
  const [vizDiv, setVizDiv] = useState(undefined);

  const vizRef = useRef(null);

  useEffect(() => {
    if (props.loaded) {
      onFirstInteractive();
    }
  },[props.loaded])

  const loadedHandler = () => {
    props.setLoaded(true);
    console.log('vizRef.current:', vizRef.current)
    setVizDiv(vizRef.current);
  }

  const onFirstInteractive = () => {
    vizDiv.addEventListener('firstinteractive', async (event) => {
      setInteractive(!interactive);
    });
  }
 
  return (
    <article>
      <img src={logo} className={`App-logo ${!interactive ? 'active' : 'inactive'}`} alt="logo" />
      <div className={`${interactive ? 'active' : 'inactive'}`}>
        <tableau-viz 
          ref={vizRef}
          id="tableauViz"       
          src={props.vizUrl}
          height={props.height}
          width={props.width}
          hideTabs={props.hideTabs}
          device={props.device}
          onLoad={loadedHandler}
        />
      </div>
    </article>
  );
}

export default Viz;
