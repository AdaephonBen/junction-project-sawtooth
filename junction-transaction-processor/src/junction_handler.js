const { TransactionHandler } = require('sawtooth-sdk/processor/handler');
const {InternalError} =require('sawtooth-sdk').exceptions;
const {decodeData, hash} = require('./lib/helper');
const cbor = require('cbor');
const env = require('./lib/env');
console.log("inside junction handler1");

class junctionHandler extends TransactionHandler {

    constructor() {
        super(env.FAMILY,env.VERSION,env.NAMESPACE);
    }
    
    async apply(transactionRequest, context) {
        try {
            console.log("going to decode");
            console.log(transactionRequest.payload);
            const payload_1 = await cbor.decodeFirstSync(transactionRequest.payload);
            console.log("payload_1");
            console.log(payload_1);
            /**
           * id : UP32CE6780
           * Latitude: 26.83
           * Longitude: 80.06
           * Orientation: 270
           * Metadata: Person Fall down
           */
            console.log("inside apply");
            console.log(payload_1.action);
            console.log(payload_1.data.car_id);
            if (!payload_1.action) {
                throw new InvalidTransaction("Payload doesnot contain action");
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
            console.log("checking type of action");
            console.log(typeof payload_1.action);
            console.log("till now no error");
            var action = payload_1.action;
            console.log("hash of family name");
            console.log(hash(env.FAMILY.substr(0,6)));
            console.log("print payload_1.data");
            console.log(typeof payload_1.data);
            console.log("hash of car id");
            console.log(hash(payload_1.data.car_id).substring(0, 64));
            var address = hash(env.FAMILY.substr(0,6)) + hash(payload_1.data.car_id).substring(0, 64);
            console.log(action);
            console.log("checking address");
            //console.log(address);
            //switch(action){
                //case "register_event":
            if(payload_1.action == "register_event"){  
                    //If yes is received from AI module
                    console.log("hi save data");
                    const random = Math.floor(Math.random() * 3);
                    console.log(random);
                    if (random == 0) {
                        let alert = {
                            info: 'Yes Danger'
                        };
                        console.log(alert);
                        let payload_2 = {
                            ...payload_1.data,
                            ...alert
                        };
                        let entries = {
                            [address]: cbor.encode(payload_2)
                        };
                        context.setState(entries);
                    }else if(random == 1){
                        let alert = {
                            info: 'No Danger'
                        };
                        console.log(alert);
                        let payload_2 = {
                            ...payload_1.data,
                            ...alert
                        };
                        let entries = {
                            [address]: cbor.encode(payload_2)
                        };
                        context.setState(entries);
                    }else{
                        let alert = {
                            info: 'I dont know'
                        };
                        console.log(alert);
                        let payload_2 = {
                            ...payload_1.data,
                            ...alert
                        };
                        let entries = {
                            [address]: cbor.encode(payload_2)
                        };
                        context.setState(entries);
                    }
            }
                //case "get_event":
                    //context.getState([address])
                     //   .then((possibleAddressValues) => {
                   //         let stateValue = possibleAddressValues[address];
                     //       if (stateValue && stateValue.length) {
                       //         let value = cbor.decodeFirstSync(stateValue);
                         //   }
                        //});
                    //return ("getevent done");
                    //console.log("get event");
                //default:
                  //  throw new InvalidTransaction("The action is invalid or not supported");
            //}
        } catch (err) {
            throw new InternalError("Error while decoding the payload");
        } 

    }
}
module.exports = junctionHandler;

