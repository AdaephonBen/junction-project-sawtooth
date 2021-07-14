const {} = require("sawtooth-sdk/processor/handler");
const { TransactionHandler } = require("sawtooth-sdk/processor/handler");
const { InternalError } = require("sawtooth-sdk").exceptions;
const { decodeData, hash } = require("./lib/helper");
const env = require('./lib/env');
const cbor = require("cbor");
//const FAMILY_NAME = "junction-family",VERSION = "1.0", NAMESPACE = ["Junction", "Danger", hash(FAMILY_NAME)];

class JunctionHandler extends TransactionHandler {
  constructor() {
    super(env.FAMILY_NAME, env.VERSION, env.NAMESPACE);
  }

  apply(transactionRequest, context) {
    return decodeData(transactionRequest.payload)
      .then((payload) => {
        /**
         * CarID : UP32CE6780
         * Latitude: 26.83
         * Longitude: 80.06
         * Orientation: 270
         * Metadata: Person Fall down
         */
        if (!payload.action) {
          throw new InvalidTransaction("Payload doesnot contain action");
        }
        if (!payload.id) {
          throw new InvalidTransaction("Payload does not contain id");
        }
        if (!payload.data) {
          throw new InvalidTransaction("Payload does not contain the data");
        }
        let action = payload.action;
        let address = NAMESPACE[2] + hash(id).substring(0, 64);
        switch (action) {
          case "register_event":
            //If yes is received from AI module
            let entries = {
              [address]: payload.data,
            };
            return context.setState(entries);
          case "get_event":
            context.getState([address]).then((possibleAddressValues) => {
              let stateValue = possibleAddressValues[address];
              if (stateValue && stateValue.length) {
                let value = cbor.decodeFirstSync(stateValue);
                return value;
              }
            });
          default:
            throw new InvalidTransaction("The action is invalid or not supported");
        }
      })
      .catch((err) => {
        throw new InternalError("Error while decoding the payload");
      });
  }
}
module.exports = JunctionHandler;

