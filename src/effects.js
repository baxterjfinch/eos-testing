function logUpdate(state, payload, blockInfo, context) {
 console.info(“blog created\n")
}
const effects =
  [{
   actionType: "blogger.p::create",
   effect: logUpdate,
  }]

module.exports = effects
