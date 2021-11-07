import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  static getDerivedStateFromError(err) {
    return {
      isError: true
    };
  }

  componentDidCatch(e, eI) {
    console.log(e, eI);
  }

  render() {
    if (this.state.isError) {
      return <div>Oh man!! Its Gone !! 😭😭 </div>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
