import { TOKEN_ICON_BASE_URL } from "./constants"

export const getTokenIcon = (currency) => {
  const baseUrl = TOKEN_ICON_BASE_URL
  return `${baseUrl}/${currency.toUpperCase()}.svg`
}