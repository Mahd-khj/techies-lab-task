"use client"

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center p-10 gap-4 text-center">
            <h2>Something went wrong loading recipes.</h2>
            <button
                onClick={() => reset()}
                className="border px-4 py-2 rounded"
            >
                Try again
            </button>
        </div>
    );
}