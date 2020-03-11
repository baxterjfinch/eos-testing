//Register blockchain Actions to which this update will be called.
const updaters = [{
 actionType: "blogger.p::create",
 updater: createProfile
}]

module.exports = updaters
