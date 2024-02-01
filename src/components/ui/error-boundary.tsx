import React, { ErrorInfo, ReactNode } from 'react'
interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

// 定义 ErrorBoundary 的 state 类型
interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo)
    this.setState({
      hasError: true
    })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}
