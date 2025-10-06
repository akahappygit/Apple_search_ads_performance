"use client";
import React from "react";

export default class ErrorBoundary extends React.Component<
  {fallback: React.ReactNode;children: React.ReactNode;},
  {hasError: boolean;}>
{
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {

    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}