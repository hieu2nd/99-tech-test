import React, { useMemo } from 'react'

interface BoxProps {
  children?: React.ReactNode
  className?: string
  [key: string]: any
}

// Mock WalletRow component
interface WalletRowProps {
  className?: string
  amount: number
  usdValue: number
  formattedAmount: string
}

enum Blockchain {
  Osmosis = 'Osmosis',
  Ethereum = 'Ethereum',
  Arbitrum = 'Arbitrum',
  Zilliqa = 'Zilliqa',
  Neo = 'Neo'
} // Define blockchain types

enum BlockchainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
  Others = -99
} // Define priority with an enum

interface WalletBalance {
  currency: string
  amount: number
  blockchain: Blockchain
}
interface FormattedWalletBalance extends WalletBalance {
  // Keep the currency and amount properties by extending WalletBalance
  formatted: string
}

const useWalletBalances = () => {
  return [
    { currency: 'USD', amount: 100, blockchain: Blockchain.Ethereum },
    { currency: 'ETH', amount: 2, blockchain: Blockchain.Ethereum },
    { currency: 'OSMO', amount: 50, blockchain: Blockchain.Osmosis },
    { currency: 'ZIL', amount: 0, blockchain: Blockchain.Zilliqa }
  ]
} // Mocking custom hook for wallet balances
const usePrices = () => {
  return {
    USD: 1,
    ETH: 2000,
    OSMO: 10,
    ZIL: 0.1
  }
} // Mocking custom hook for prices

const WalletRow: React.FC<WalletRowProps> = ({
  className,
  amount,
  usdValue,
  formattedAmount
}) => {
  return (
    <div
      className={className}
      style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}
    >
      <span>Amount: {formattedAmount}</span>
      <span style={{ marginLeft: '20px' }}>
        USD Value: ${usdValue.toFixed(2)}
      </span>
    </div>
  )
}

const classes = {
  row: 'wallet-row'
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props
  const balances = useWalletBalances()
  const prices = usePrices()

  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case Blockchain.Osmosis:
        return BlockchainPriority.Osmosis
      case Blockchain.Ethereum:
        return BlockchainPriority.Ethereum
      case Blockchain.Arbitrum:
        return BlockchainPriority.Arbitrum
      case Blockchain.Zilliqa:
        return BlockchainPriority.Zilliqa
      case Blockchain.Neo:
        return BlockchainPriority.Neo
      default:
        return BlockchainPriority.Others
    }
  }

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        if (balancePriority > -99) {
          if (balance.amount <= 0) {
            return true
          }
        }
        return false
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        if (leftPriority > rightPriority) {
          return -1
        } else if (rightPriority > leftPriority) {
          return 1
        }
        return 0
      })
  }, [balances]) // Remove the dependency on prices as it is not used in sorting

  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  }, [sortedBalances])

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }
  )

  return <div {...rest}>{rows}</div>
}

export default WalletPage