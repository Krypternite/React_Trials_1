import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import ErrorBoundary from "./Error";

const Studentform = React.lazy(
  () =>
    new Promise((resolve) => setTimeout(() => resolve(import("./form")), 1000))
);

export default function App(props) {
  const [context, setContext] = useState(props.context);
  let count = 1;
  const formRef = useRef(null);
  useEffect(() => {
    console.log(formRef);
  }, [formRef]);

  const onClickBtn = () => {
    // Getting ref to JQuery object from our parent app.
    var myDomEl = context.find("#el");

    // Update color of our element.
    myDomEl.css("background-color", "green");
  };

  const incrementCount = () =>
    formRef.current.setCount((prevCount) => prevCount + prevCount);

  return (
    <div className="App">
      <button type="button" className="btn btn-default" onClick={onClickBtn}>
        Click to Update!
      </button>
      <button onClick={incrementCount}>Count ++ </button>
      <ErrorBoundary>
        <React.Suspense fallback={<div> PLAYING ... </div>}>
          <Studentform ref={formRef} />
          <div id="portal"></div>
        </React.Suspense>
      </ErrorBoundary>
      {formRef?.current?.input()}
    </div>
  );
}
