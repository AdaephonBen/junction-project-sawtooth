const { TransactionProcessor } = require('sawtooth-sdk/processor');
const env = require('./env');

const JunctionHandler = require('./src/junction_handler');

const transactionProcessor = new TransactionProcessor(env.VALIDATOR);
transactionProcessor.addHandler(new JunctionHandler());
transactionProcessor.start();
console.log("Registered")

process.on('SIGUSR',()=>{
    transactionProcessor._handleShutdown();
})
