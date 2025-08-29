'use client';

import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            const CustomFallback = this.props.fallback;

            if (CustomFallback) {
                return (
                    <CustomFallback
                        error={this.state.error!}
                        retry={() => this.setState({ hasError: false, error: undefined })}
                    />
                );
            }

            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-dark-300">
                    <div className="text-center space-y-6 max-w-md">
                        <Image
                            src="/assets/icons/logo-full.svg"
                            alt="CarePulse"
                            width={200}
                            height={50}
                            className="mx-auto"
                        />

                        <div className="space-y-4">
                            <h1 className="text-2xl font-bold text-white">
                                Something went wrong
                            </h1>
                            <p className="text-dark-600">
                                We apologize for the inconvenience. Our technical team has been notified.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => window.location.reload()}
                                className="shad-primary-btn"
                            >
                                Refresh Page
                            </Button>
                            <Button
                                onClick={() => window.history.back()}
                                variant="outline"
                                className="shad-gray-btn"
                            >
                                Go Back
                            </Button>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-6 text-left bg-dark-400 p-4 rounded-lg">
                                <summary className="cursor-pointer font-semibold text-red-400">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="mt-2 text-xs text-dark-600 overflow-auto">
                                    {this.state.error?.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

// Usage wrapper component
export const withErrorBoundary = <P extends object>(
    Component: React.ComponentType<P>,
    fallback?: React.ComponentType<{ error: Error; retry: () => void }>
) => {
    const WrappedComponent = (props: P) => (
        <ErrorBoundary fallback={fallback}>
            <Component {...props} />
        </ErrorBoundary>
    );

    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
    return WrappedComponent;
};