import { getTokenIcon } from '../../utils/helper'

export const CurrencyOption = ({ data, innerRef, innerProps }) => {
  return (
    <div 
      ref={innerRef} 
      {...innerProps} 
      className="flex items-center justify-between p-2 md:p-3 cursor-pointer"
    >
      <div className="flex items-center">
        <img
          src={getTokenIcon(data.value)}
          alt={data.value}
          className="w-5 h-5 mr-2 rounded-full"
          loading="lazy"
          crossOrigin="anonymous"
          onLoad={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMTAiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI0IiB5PSI0Ij4KPHBhdGggZD0iTTYgMUMzLjI0IDEgMSAzLjI0IDEgNkMxIDguNzYgMy4yNCAxMSA2IDExQzguNzYgMTEgMTEgOC43NiAxMSA2QzExIDMuMjQgOC43NiAxIDYgMVpNNiA5LjVDNS4xNyA5LjUgNC41IDguODMgNC41IDhDNC41IDcuMTcgNS4xNyA2LjUgNiA2LjVDNi44MyA2LjUgNy41IDcuMTcgNy41IDhDNy41IDguODMgNi44MyA5LjUgNiA5LjVaIiBmaWxsPSIjOUM5Qzk0Ii8+Cjwvc3ZnPgo8L3N2Zz4K';
          }}
        />
        <span className="font-medium">{data.label}</span>
      </div>
    </div>
  )
}
