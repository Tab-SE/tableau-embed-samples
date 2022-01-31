import { Helmet } from "react-helmet" // adds <script> tag to the document head
import Viz from "./Viz/Viz.js"


function Tableau(props) {
  return (
    <>
      <Helmet> 
        <script type="module" src="https://embedding.tableauusercontent.com/tableau.embedding.3.0.0.min.js" async></script>
      </Helmet>
      <Viz/>
    </>
  );
}

export default Tableau;
