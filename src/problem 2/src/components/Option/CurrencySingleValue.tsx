import React from 'react'
import { components } from 'react-select'
import { getTokenIcon } from '../../utils/helper'

export const CurrencySingleValue = (props) => {
  const { data } = props
  
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center">
        <img
          src={getTokenIcon(data.value)}
          alt={data.value}
          className="w-5 h-5 mr-2 rounded-full"
        />
        <span className="font-medium">{data.label}</span>
      </div>
    </components.SingleValue>
  )
}
