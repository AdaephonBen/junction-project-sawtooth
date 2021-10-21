const { TransactionProcessor } = require('sawtooth-sdk/processor');
const env = require('./src/lib/env');
const junctionHandler = require('./src/junction_handler');
console.log("Validator url check",process.env.VALIDATOR_URL);
console.log("Validator check",env.VALIDATOR);
const transactionProcessor = new TransactionProcessor(process.env.VALIDATOR_URL);
console.log("Handler Created");
transactionProcessor.addHandler(new junctionHandler());
console.log("Handler added");
transactionProcessor.start();

console.log("Registered")

process.on('SIGUSR',()=>{
    transactionProcessor._handleShutdown();
})