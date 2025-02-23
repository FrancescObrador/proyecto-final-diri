import React, { useState, useEffect } from 'react'

interface CenteredLoaderProps {
    messages: string[]
    intervalTime?: number // tiempo en milisegundos
}

const CenteredLoader = ({ messages, intervalTime = 3000 }: CenteredLoaderProps) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => 
                prevIndex === messages.length - 1 ? 0 : prevIndex + 1
            )
        }, intervalTime)

        return () => clearInterval(interval)
    }, [messages.length, intervalTime])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-2">
            <div className="loading loading-lg text-primary" />
            <p className="text-center text-gray-600">
                {messages[currentMessageIndex]}
            </p>
        </div>
    )
}

export default CenteredLoader