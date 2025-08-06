import * as yup from 'yup'

export const CURRENCY_SCHEMA = yup
  .object({
    fromCurrency: yup.object({
      value: yup.string().required('Please select a currency to swap from')
    }),
    toCurrency: yup.object({
      value: yup.string().required('Please select a currency to swap to')
    }),
    fromAmount: yup.string().required('From amount is required'),
    toAmount: yup.string().required('To amount is required')
  })
  .test(
    'different-currencies',
    'Cannot swap to the same currency',
    function (values) {
      if (values.fromCurrency.value && values.toCurrency.value) {
        if (values.fromCurrency.value === values.toCurrency.value) {
          return this.createError({
            path: 'toCurrency',
            message: 'Cannot swap to the same currency'
          })
        }
      }
      return true
    }
  )
