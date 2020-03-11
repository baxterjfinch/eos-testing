
function parseTokenString(tokenString) {
  const [amountString, symbol] = tokenString.split(" ")
  const amount = parseFloat(amountString)
  return { amount, symbol }
}

function updateTransferData(state, payload, blockInfo, context) {
  const { amount, symbol } = parseTokenString(payload.data.quantity)
  if (!state.volumeBySymbol[symbol]) {
    state.volumeBySymbol[symbol] = amount
  } else {
    state.volumeBySymbol[symbol] += amount
  }
  state.totalTransfers += 1
  context.stateCopy = JSON.parse(JSON.stringify(state)) // Deep copy state to de-reference
}

const updaters = [
  {
    actionType: "eosio.token::transfer",
    apply: updateTransferData,
  },
]



function logUpdate(payload, blockInfo, context) {
  console.info("State updated:\n", JSON.stringify(context.stateCopy, null, 2))
}

const effects = [
  {
    actionType: "eosio.token::transfer",
    run: logUpdate,
  },
]

const handlerVersion = {
  versionName: "v1",
  updaters,
  effects,
}

module.exports = handlerVersion
