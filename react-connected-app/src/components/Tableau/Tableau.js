import { useState, useEffect } from "react"
import { Helmet } from "react-helmet" // adds <script> tag to the document head


function Tableau() {
  return (
    <>
      <Helmet> 
        <script type="module" src="https://embedding.tableauusercontent.com/tableau.embedding.3.0.0.min.js" async></script>
      </Helmet>
      <div>

      </div>
    </>
  );
}

export default Tableau;
