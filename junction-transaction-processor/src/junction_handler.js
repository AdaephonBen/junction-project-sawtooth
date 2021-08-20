const {} = require("sawtooth-sdk/processor/handler");
const { TransactionHandler } = require("sawtooth-sdk/processor/handler");
const { InternalError } = require("sawtooth-sdk").exceptions;
const { decodeData, hash } = require("./lib/helper");
const env = require('./lib/env');
const cbor = require("cbor");
//const FAMILY_NAME = "junction-family",VERSION = "1.0", NAMESPACE = ["Junction", "Danger", hash(FAMILY_NAME)];

class JunctionHandler extends TransactionHandler {
  constructor() {
    super(env.FAMILY, env.VERSION, env.NAMESPACE);
  }

  async apply(transactionRequest, context) {
        try {
            console.log("going to decode");
            console.log(transactionRequest.payload);
            const payload_1 = await cbor.decodeFirstSync(transactionRequest.payload);
            console.log("payload_1");
            console.log(payload_1);
        /**
         * CarID : UP32CE6780
         * Latitude: 26.83
         * Longitude: 80.06
         * Orientation: 270
         * Metadata: Person Fall down
         */
        if (!payload_1.action) {
          throw new InvalidTransaction("Payload doesnot contain action");
        }
        if (!payload_1.id) {
          throw new InvalidTransaction("Payload does not contain id");
        }
        if (!payload_1.data.car_id) {
          throw new InvalidTransaction("Payload does not contain id");
        }
        if (!payload_1.data.latitude) {
          throw new InvalidTransaction("Payload does not contain the latitude");
        }
        if (!payload_1.data.longitude) {
          throw new InvalidTransaction("Payload does not contain the longitude");
        }
        if (!payload_1.data.orientation) {
          throw new InvalidTransaction("Payload does not contain the orientation");
        }
        if (!payload_1.data.metadata) {
          throw new InvalidTransaction("Payload does not contain the metadata");
        }
        let action = payload_1.action;
        var address = hash(env.FAMILY.substr(0,6)) + hash(payload_1.data.car_id).substring(0, 64);
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

