import { useFormSwap } from '../../hooks/useFormSwap'
import CurrencyAmountInput from '../CurrencyAmountInput/CurrencyAmountInput'
import SwapResultModal from '../ResultModal/SwapResultModal'

const CryptoSwapForm = () => {
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    cryptoOptions,
    loading,
    error,
    onSubmit,
    handleSwapCurrencies,
    handleFromAmountChange,
    handleToAmountChange,
    customSelectStyles,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    priceData,
    isModalOpen,
    swapResult,
    closeModal
  } = useFormSwap()

  // Create a simple watch function for the currency components
  const watchFields = (field: string) => {
    switch (field) {
      case 'fromAmount':
        return fromAmount
      case 'fromCurrency':
        return fromCurrency
      case 'toAmount':
        return toAmount
      case 'toCurrency':
        return toCurrency
      default:
        return undefined
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gradient-blue-purple w-full">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        <h2 className="text-center mb-6 text-gray-800 text-2xl font-semibold">
          Cryptocurrency Swap
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cryptocurrency data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white border-none px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* From Currency and Amount */}
            <CurrencyAmountInput
              control={control}
              amountFieldName="fromAmount"
              currencyFieldName="fromCurrency"
              amountLabel="You Send"
              currencyLabel="From"
              errors={errors}
              cryptoOptions={cryptoOptions}
              customSelectStyles={customSelectStyles}
              onAmountChange={handleFromAmountChange}
              priceData={priceData}
              watch={watchFields}
            />

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwapCurrencies}
                className="bg-gradient-blue-purple text-white outline-none border-none rounded-full w-10 h-10 my-2 flex items-center justify-center cursor-pointer text-lg transition-all shadow-lg hover:rotate-180 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:rotate-0 relative"
                disabled={!fromCurrency && !toCurrency}
              >
                ⇅
              </button>
            </div>

            {/* To Currency and Amount */}
            <CurrencyAmountInput
              control={control}
              amountFieldName="toAmount"
              currencyFieldName="toCurrency"
              amountLabel="You Receive"
              currencyLabel="To"
              errors={errors}
              cryptoOptions={cryptoOptions}
              customSelectStyles={customSelectStyles}
              onAmountChange={handleToAmountChange}
              priceData={priceData}
              watch={watchFields}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-blue-purple text-white border-none px-6 py-3 rounded-lg text-base font-medium cursor-pointer transition-all hover:transform hover:-translate-y-0.5 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Swap Currencies'}
            </button>
          </form>
        )}
      </div>

      {/* Swap Result Modal */}
      <SwapResultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        swapData={swapResult}
      />
    </div>
  )
}

export default CryptoSwapForm
