import React from 'react'

interface SwapResultModalProps {
  isOpen: boolean
  onClose: () => void
  swapData: {
    fromAmount: string
    fromCurrency: string
    toCurrency: string
    estimatedAmount: string
    exchangeRate: string
  } | null
}

const SwapResultModal: React.FC<SwapResultModalProps> = ({
  isOpen,
  onClose,
  swapData
}) => {
  if (!isOpen || !swapData) return null
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            Swap Successful! <span className="text-xl">🎉</span>
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600 text-xl font-light transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <span className="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                    From:
                  </span>
                  <span className="text-base font-bold text-gray-800">
                    {swapData.fromAmount} {swapData.fromCurrency}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="text-lg text-blue-500 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center">
                  →
                </div>
              </div>
              <div className="flex-1 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <div className="text-center">
                  <span className="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                    To:
                  </span>
                  <span className="text-base font-bold text-blue-600">
                    {swapData.estimatedAmount} {swapData.toCurrency}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Exchange Rate:
              </span>
              <span className="text-xs font-semibold text-gray-700">
                1 {swapData.fromCurrency} = {swapData.exchangeRate}{' '}
                {swapData.toCurrency}
              </span>
            </div>
          </div>
          <div className="text-center space-y-2 mb-2">
            <p className="text-sm text-green-600 font-medium">
              Your cryptocurrency swap has been processed successfully!
            </p>
          </div>
        </div>
        <div className="p-4">
          <button
            className="w-full bg-gradient-blue-purple text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SwapResultModal
