//const {} = require('sawtooth-sdk/processor/handler');
const { TransactionHandler } = require('sawtooth-sdk/processor/handler');
const {InternalError} =require('sawtooth-sdk').exceptions;
//const payload_j= require('./payload');
const {decodeData, hash} = require('./lib/helper');
const cbor = require('cbor');
const env = require('./lib/env');
//const { decodeFirstSync } = require('cbor/types/lib/decoder');
//const FAMILY_NAME = "junction-family", VERSION = "1.0", NAMESPACE = ["Junction","Junction_p",hash(FAMILY_NAME)];
console.log("inside junction handler1");
//console.log(payload_j.Junction_Payload.fromBytes([254,33]));

class junctionHandler extends TransactionHandler {

    constructor() {
        super(env.FAMILY,env.VERSION,env.NAMESPACE);
    }
    
    async apply(transactionRequest, context) {
        try {
            console.log("Going to decode payload...");
            console.log(transactionRequest.payload);
            const payload_1 = await cbor.decodeFirstSync(transactionRequest.payload);
            //if (payload_1.err) { console.log('error');}
            //else { console.log('decoded request');}
            console.log("payload_1");
            console.log(payload_1);
            /**
           * id : UP32CE6780
           * Latitude: 26.83
           * Longitude: 80.06
           * Orientation: 270
           * Metadata: Person Fall down
           */
            //   let payload = Junction_Payload.fromBytes(transactionProcessRequest.payload)
            console.log("Inside apply: Print type of action");
            console.log(payload_1.action);
            //console.log(payload_1.data.car_id);
            if (!payload_1.action) {
                throw new InvalidTransaction("Payload doesnot contain action");
            }
            if(payload_1.action == "register_event"){
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
            }
            console.log("checking type of action");
            console.log(typeof payload_1.action);
            console.log("till now no error");
            var action = payload_1.action;
            console.log("hash of family name");
            console.log(hash(env.FAMILY).substr(0,6));
            console.log("Print payload_1.data");
            //console.log(typeof payload_1.data);
            //str="alert:yes danger";
            //obj = eval('({' + str + '})');
            
            //console.log(payload_2);
            console.log("hash of car id");
            //console.log(hash(payload_1.data.car_id).substring(0, 64));
            var address = hash(env.FAMILY).substr(0,6) + hash(payload_1.id).substring(0, 64);
            console.log(action);
            console.log("checking address");
            //console.log(address);
            //switch(action){
                //case "register_event":
	    let duplicate = false;
	    if (payload_1.action == "register_event") {
	    	context.getState([address], 500).then(addressValues => {
	    	    console.log("Checking for duplicate");
	    	    console.log(addressValues);
	    	    if (addressValues[address]) {
	    	    	console.log(cbor.decode(addressValues[address]));
	    	    	console.log("Duplicate event. Ignoring...");
	    	    	duplicate = true;
	    	    }
	    	});
	    }
            if(payload_1.action == "register_event" && !duplicate){  
                    //If yes is received from AI module
                    console.log("hi save data");
		    payload_1.info = process.env.INFO;
		    console.log(payload_1);
                    let entries = {
                        [address]: cbor.encode(payload_1)
                    };
                    context.setState(entries);

                    /*if (random == 0) {
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
                        console.log(typeof entries);
                        console.log(payload_2);
                        context.setState(entries);
                    }else if(random == 1){
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
                        console.log(typeof entries);
                        console.log(payload_2);
                        context.setState(entries);
                    }else{
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
                        console.log(payload_2);
                        console.log(typeof entries);
                        //console.log(decodeFirstSync(entries.address));
                        context.setState(entries);
                    }*/
            } else if (payload_1.action == "get_event") {
		return context.getState([address], 500).then(addressValues => {
			console.log("In get_event");
			console.log(addressValues);
			console.log(cbor.decode(addressValues[address]));

			return cbor.decode(addressValues[address]);
		});	
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
//module.exports = Junction_Payload;
