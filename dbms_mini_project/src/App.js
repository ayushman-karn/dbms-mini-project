import React from "react";
import Form from "./Form.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
export function Navbar() {
  return (
    <nav className="navbar navbar-light bg-dark">
      <a id="home-link" className="navbar-brand" href="/" style={{ color: "white" }}   >
        HOME
      </a>
    </nav>
  );
}
class App extends React.Component {

  render() {
    return (<div className="App" >
      <Navbar />
      <Form />
    </div>
    )

  }
}

export default App;
