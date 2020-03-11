const massive = require('massive');
const { BaseActionWatcher } = require("demux")
const { NodeosActionReader } = require("demux-eos") // eslint-disable-line
const ObjectActionHandler = require("./ObjectActionHandler")
const handlerVersion = require("./handlerVersions/v1")

let db;

massive({
  host: "localhost",
  port: 5432,
  database: "eos_testing_state",
  user: "postgres",
  password: "password"
}).then(instance => {
  db = instance;
  return Promise.resolve(db);
}).catch(e => {
  console.log(e)
  console.log('error while getting massive instance')
});

/*
 * This ObjectActionHandler, which does not change the signature from its parent AbstractActionHandler, takes an array
 * of `HandlerVersion` objects
 */
const actionHandler = new ObjectActionHandler([handlerVersion])

const actionReader = new NodeosActionReader({
  startAtBlock: 10,
  onlyIrreversible: false,
  nodeosEndpoint: "http://127.0.0.1:8888"
});

/* BaseActionWatcher
 * This ready-to-use base class helps coordinate the Action Reader and Action Handler, passing through block information
 * from the Reader to the Handler. The third argument is the polling loop interval in milliseconds. Since EOS has 0.5s
 * block times, we set this to half that for an average of 125ms latency.
 *
 * All that is left to run everything is to call `watch()`.
 */
const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  250,
)

actionWatcher.watch()
