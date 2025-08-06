import React from 'react'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import Select, { OptionsOrGroups } from 'react-select'
import { CurrencyOption } from '../Option/CurrencyOption'
import { CurrencySingleValue } from '../Option/CurrencySingleValue'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

interface CurrencyAmountInputProps {
  control: Control<any>
  amountFieldName: string
  currencyFieldName: string
  amountLabel: string
  currencyLabel: string
  amountPlaceholder?: string
  currencyPlaceholder?: string
  errors: FieldErrors
  cryptoOptions: OptionsOrGroups<{ value: string; label: string; price: string }, never>
  customSelectStyles: any
  onAmountChange?: (value: string) => void
  priceData?: Record<string, number>
  watch?: any
}

const CurrencyAmountInput: React.FC<CurrencyAmountInputProps> = ({
  control,
  amountFieldName,
  currencyFieldName,
  amountLabel,
  currencyLabel,
  amountPlaceholder = "0.00",
  currencyPlaceholder = "Select...",
  errors,
  cryptoOptions,
  customSelectStyles,
  onAmountChange,
  priceData = {},
  watch
}) => {
  // Watch the current values
  const currentAmount = watch ? watch(amountFieldName) : ''
  const currentCurrency = watch ? watch(currencyFieldName) : null

  // Calculate USD value
  const getUSDValue = () => {
    if (!currentAmount || !currentCurrency || !priceData[currentCurrency.value]) {
      return null
    }
    const amount = parseFloat(currentAmount)
    const price = priceData[currentCurrency.value]
    return (amount * price).toFixed(2)
  }

  return (
    <div className="mb-4">
      <div className="flex gap-3 items-start flex-wrap md:flex-nowrap">
        <div className="flex-1 min-w-0">
          <label className="block mb-2 text-gray-700 font-semibold uppercase text-xs tracking-wide">
            {amountLabel}
          </label>
          <Controller
            name={amountFieldName}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                step="0.000001"
                placeholder={amountPlaceholder}
                className={`w-full px-3 border rounded transition-colors text-lg font-semibold text-gray-800 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-md h-[38px] ${
                  errors[amountFieldName] ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={(e) => {
                  field.onChange(e)
                  if (onAmountChange) {
                    onAmountChange(e.target.value)
                  }
                }}
              />
            )}
          />
          {getUSDValue() && (
            <div className="text-xs text-gray-500 mt-1 px-1 py-1 font-medium">
              ≈ ${getUSDValue()} USD
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <label className="block mb-2 text-gray-700 font-semibold uppercase text-xs tracking-wide">
            {currencyLabel}
          </label>
          <Controller
            name={currencyFieldName}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={cryptoOptions}
                placeholder={currencyPlaceholder}
                components={{
                  Option: CurrencyOption,
                  SingleValue: CurrencySingleValue
                }}
                styles={customSelectStyles}
                className={errors[currencyFieldName] ? 'border-red-500' : ''}
              />
            )}
          />
        </div>
      </div>
      <div className="w-full mt-2">
        <ErrorMessage
          message={
            (errors[currencyFieldName] as any)?.value?.message ||
            errors[amountFieldName]?.message
          }
        />
      </div>
    </div>
  )
}

export default CurrencyAmountInput
