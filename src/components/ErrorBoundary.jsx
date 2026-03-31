import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI to prevent blank black screen
      return (
        <div className="flex flex-col items-center justify-center min-h-[500px] w-full bg-black text-white p-8">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Something went wrong</h2>
          <p className="text-gray-300 mb-6">We encountered an unexpected layout issue.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all font-semibold"
          >
            Return to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
