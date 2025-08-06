import React from 'react'

interface ErrorMessageProps {
  message?: string
  show?: boolean
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, show = true }) => {
  if (!message || !show) {
    return null
  }

  return (
    <span className="text-red-500 text-sm font-medium mt-1 block" role="alert">
      {message}
    </span>
  )
}

export default ErrorMessage
