import Image from 'next/image';

interface LoadingProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
}

const Loading = ({
    message = "Loading...",
    size = 'md',
    fullScreen = false
}: LoadingProps) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const containerClasses = fullScreen
        ? "fixed inset-0 bg-dark-300 flex items-center justify-center z-50"
        : "flex items-center justify-center p-4";

    return (
        <div className={containerClasses} role="status" aria-live="polite">
            <div className="flex flex-col items-center space-y-4">
                <Image
                    src="/assets/icons/loader.svg"
                    alt="Loading"
                    width={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
                    height={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
                    className={`${sizeClasses[size]} animate-spin`}
                />
                <p className="text-dark-600 text-sm" aria-describedby="loading-message">
                    <span id="loading-message">{message}</span>
                </p>
            </div>
        </div>
    );
};

export default Loading;

// Skeleton loaders for forms
export const FormSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
            <div className="h-4 bg-dark-400 rounded w-1/4"></div>
            <div className="h-11 bg-dark-400 rounded"></div>
        </div>
        <div className="space-y-2">
            <div className="h-4 bg-dark-400 rounded w-1/3"></div>
            <div className="h-11 bg-dark-400 rounded"></div>
        </div>
        <div className="space-y-2">
            <div className="h-4 bg-dark-400 rounded w-1/4"></div>
            <div className="h-11 bg-dark-400 rounded"></div>
        </div>
    </div>
);