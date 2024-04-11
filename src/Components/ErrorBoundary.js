import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI
      return <div>Error occurred. Please try again later.</div>;
    }

    // Render children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
