import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { OptionsOrGroups } from 'react-select'
import { CURRENCY_SCHEMA } from '../utils/schema'

interface CryptoOption {
  value: string
  label: string
  price: string
}

interface FormData {
  fromCurrency: { value: string }
  toCurrency: { value: string }
  fromAmount: string
  toAmount: string
}

interface SwapResultData {
  fromAmount: string
  fromCurrency: string
  toCurrency: string
  estimatedAmount: string
  exchangeRate: string
}

export const useFormSwap = () => {
  const [cryptoOptions, setCryptoOptions] = useState<
    OptionsOrGroups<CryptoOption, never>
  >([])
  const [priceData, setPriceData] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [swapResult, setSwapResult] = useState<SwapResultData | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger
  } = useForm<FormData>({
    resolver: yupResolver(CURRENCY_SCHEMA)
  })

  // Fetch cryptocurrency data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'https://interview.switcheo.com/prices.json'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch cryptocurrency data')
        }
        const data = await response.json()

        // Process the data to get unique currencies with latest prices
        const currencyMap = new Map()

        data.forEach((item: any) => {
          const existingItem = currencyMap.get(item.currency)
          if (
            !existingItem ||
            new Date(item.date) > new Date(existingItem.date)
          ) {
            currencyMap.set(item.currency, item)
          }
        })

        // Convert to options format for react-select
        const options: OptionsOrGroups<CryptoOption, never> = Array.from(
          currencyMap.values()
        )
          .sort((a, b) => a.currency.localeCompare(b.currency))
          .map((item) => ({
            value: item.currency,
            label: `${item.currency}`,
            price: item.price
          }))

        // Create price to look up
        const prices: Record<string, number> = {}
        currencyMap.forEach((item, currency) => {
          prices[currency] = parseFloat(item.price)
        })

        setCryptoOptions(options)
        setPriceData(prices)
        setError(null)
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching crypto data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCryptoData()
  }, [])

  const fromCurrency = watch('fromCurrency')
  const toCurrency = watch('toCurrency')
  const fromAmount = watch('fromAmount')
  const toAmount = watch('toAmount')

  // Calculate exchange rate
  const getExchangeRate = () => {
    if (
      !fromCurrency ||
      !toCurrency ||
      !priceData[fromCurrency.value] ||
      !priceData[toCurrency.value]
    ) {
      return null
    }
    return priceData[fromCurrency.value] / priceData[toCurrency.value]
  }

  // Handle from amount change
  const handleFromAmountChange = (value: string) => {
    const rate = getExchangeRate()
    if (rate && value) {
      const calculatedToAmount = (parseFloat(value) * rate).toFixed(6)
      setValue('toAmount', calculatedToAmount)
    } else {
      setValue('toAmount', '')
    }
  }

  // Handle to amount change
  const handleToAmountChange = (value: string) => {
    const rate = getExchangeRate()
    if (rate && value) {
      const calculatedFromAmount = (parseFloat(value) / rate).toFixed(6)
      setValue('fromAmount', calculatedFromAmount)
    } else {
      setValue('fromAmount', '')
    }
  }

  // Update amounts when currencies change
  useEffect(() => {
    if (fromAmount && getExchangeRate()) {
      handleFromAmountChange(fromAmount as string)
    }
  }, [fromCurrency, toCurrency])

  // Calculate estimated amount
  const getEstimatedAmount = () => {
    const rate = getExchangeRate()
    if (rate && fromAmount) {
      return (parseFloat(fromAmount as string) * rate).toFixed(6)
    }
    return null
  }

  // Calculate USD values
  const getFromUsdValue = () => {
    if (!fromCurrency || !fromAmount || !priceData[fromCurrency.value]) {
      return 0
    }
    return parseFloat(fromAmount as string) * priceData[fromCurrency.value]
  }

  const getToUsdValue = () => {
    const estimatedAmount = getEstimatedAmount()
    if (!toCurrency || !estimatedAmount || !priceData[toCurrency.value]) {
      return 0
    }
    return parseFloat(estimatedAmount) * priceData[toCurrency.value]
  }

  // Handle max button click
  const handleMaxClick = () => {
    // Set max amount to 100 for demo purposes
    setValue('fromAmount', '100')
    trigger('fromAmount')
  }

  const onSubmit = async (data: FormData) => {
    console.log('Swap Data:', data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const rate = getExchangeRate()
    const estimatedAmount = getEstimatedAmount()

    if (rate && estimatedAmount) {
      const resultData: SwapResultData = {
        fromAmount: data.fromAmount,
        fromCurrency: data.fromCurrency.value,
        toCurrency: data.toCurrency.value,
        estimatedAmount: estimatedAmount,
        exchangeRate: rate.toFixed(6)
      }

      setSwapResult(resultData)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSwapResult(null)
  }

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency
    const tempFromAmount = fromAmount
    const tempToAmount = toAmount

    setValue('fromCurrency', toCurrency)
    setValue('toCurrency', tempCurrency)
    setValue('fromAmount', tempToAmount as string)
    setValue('toAmount', tempFromAmount as string)

    // Trigger validation after swapping
    setTimeout(() => {
      trigger(['fromCurrency', 'toCurrency'])
    }, 0)
  }

  const customSelectStyles = useMemo(() => {
    return {
      control: (provided: any, state: any) => ({
        ...provided,
        height: '38px',
        minHeight: '38px',
        borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
        boxShadow: state.isFocused ? '0 0 0 1pxrgb(20, 53, 107)' : 'none',
        '&:hover': {
          borderColor: '#3b82f6'
        }
      }),
      valueContainer: (provided: any) => ({
        ...provided,
        height: '36px',
        padding: '0 8px'
      }),
      input: (provided: any) => ({
        ...provided,
        margin: '0px',
        color: '#374151'
      }),
      indicatorsContainer: (provided: any) => ({
        ...provided,
        height: '36px'
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? '#3b82f6'
          : state.isFocused
          ? '#eff6ff'
          : 'white',
        color: state.isSelected ? 'white' : '#1f2937',
        '&:hover': {
          backgroundColor: state.isSelected ? '#3b82f6' : '#eff6ff'
        }
      }),
      placeholder: (provided: any) => ({
        ...provided,
        color: '#9ca3af'
      })
    }
  }, [])

  const customFilter = (option: any, inputValue: string) => {
    if (!inputValue) return true

    const searchValue = inputValue.toLowerCase()
    const currency = option.value.toLowerCase()
    const label = option.label.toLowerCase()

    return currency.includes(searchValue) || label.includes(searchValue)
  }

  return {
    // Form state
    control,
    handleSubmit,
    errors,
    isSubmitting,

    // Data state
    cryptoOptions,
    priceData,
    loading,
    error,

    // Computed values
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    getFromUsdValue,
    getToUsdValue,

    // Functions
    getExchangeRate,
    getEstimatedAmount,
    onSubmit,
    handleSwapCurrencies,
    handleFromAmountChange,
    handleToAmountChange,
    customSelectStyles,
    customFilter,
    handleMaxClick,

    // Modal state
    isModalOpen,
    swapResult,
    closeModal
  }
}
