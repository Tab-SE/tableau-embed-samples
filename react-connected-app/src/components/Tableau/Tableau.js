import { useState } from "react";
import { Helmet } from "react-helmet"; // adds <script> tag to the document head
import Viz from "./Viz/Viz.js";

function Tableau(props) {
  const [vizObj, setVizObj] = useState(undefined);

  return (
    <>
      <Helmet> 
        <script type="module" src="https://embedding.tableauusercontent.com/tableau.embedding.3.0.0.min.js" async></script>
      </Helmet>
      <Viz
        VizObj={vizObj}
        setVizObj={setVizObj}
        vizUrl={props.vizUrl}
        height={props.height}
        width={props.width}
        hideTabs={props.hideTabs}
        device={props.device}
      />
    </>
  );
}

export default Tableau;
