const crypto = require('crypto');
const cbor =require('cbor')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')

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
                `Wallet Name is already in state, Name: ${name} Value: ${stateName}`
            )
        }
    }

const decodeData = (payload) => {
    return new Promise((resolve,reject) =>{
        let result = JSON.parse(payload);
        result ? resolve(result) : reject(result);
    })
}
const hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substr(0,6);
module.exports = {
    decodeData,
    hash,
    decodeCbor,
    toInternalError
}