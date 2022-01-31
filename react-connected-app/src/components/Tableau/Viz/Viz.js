import { useState, useEffect } from "react"

function Viz(props) {  
  return (
    <tableau-viz id="tableauViz"       
      src='http://my-server/views/my-workbook/my-view'>
    </tableau-viz>
  );
}

export default Viz;
