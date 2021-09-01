const crypto =require('crypto');
const cbor =require('cbor');
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions');
const { stringify } = require('querystring');
console.log("inside helper");

const decodeCbor = (buffer) =>
    new Promise((resolve, reject) =>
        cbor.decodeFirst(buffer, (err, obj) => (err ? reject(err) : resolve(obj)))
    )

const toInternalError = (err) => {
    let message = (err.message) ? err.message : err
    throw new InternalError(message)
}

const applySet = (context, address, name, value) => (possibleAddressValues) => {
    let stateValueRep = possibleAddressValues[address]
    console.log(stateValueRep);
    let stateValue
    if (stateValueRep && stateValueRep.length > 0) {
        stateValue = cbor.decodeFirstSync(stateValueRep)
        console.log(stateValue)
        let stateName = stateValue[name]
        if (stateName) {
            throw new InvalidTransaction(
                `This danger is already registered by, Name: ${name} Value: ${stateName}`
            )
        }
    }
    if (!stateValue) {
        stateValue = {}
    }

    stateValue[name] = value

    return setEntry(context, address, stateValue)
}

const decodeData = (payload) => {
    return new Promise((resolve,reject) =>{
        console.log("Hello");
        //console.log(cbor.decodeFirst(payload));
        //console.log(atob(stringify(Buffer.from(payload))));
        console.log("hii");
        console.log(decodeCbor(payload));
        console.log("buff+decode");
        console.log(cbor.decodeFirstSync(Buffer.from(payload)));
        console.log("computing result");
        console.log(typeof payload);
        console.log(typeof cbor.decodeFirstSync(payload));
        let result = JSON.parse(cbor.decodeFirstSync(payload));
        console.log("result");
        console.log(typeof result);
        console.log(result);
        result ? resolve(result) : reject(result);
    })
}
const hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase();
console.log("hash created");

module.exports = {
    decodeData,
    hash,
    decodeCbor,
    toInternalError
}