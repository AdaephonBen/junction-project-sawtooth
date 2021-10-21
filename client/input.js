const fs = require("fs");
const input = {
  payloadIsValid: (payload) => {
	  console.log("Inside payloadIsValid")
    if (payload.action === "register_event") {
      return (
        payload.id !== undefined &&
        payload.data.car_id !== undefined &&
        payload.data.latitude !== undefined &&
        payload.data.longitude !== undefined &&
        payload.data.orientation !== undefined &&
        payload.data.metadata !== undefined
      );
    } else if (payload.action === "get_event") {
      return payload.id !== undefined;
    }
    return false;
  },
  submitPayload: async (payload, transactor) => {
    try {
      // Format the Sawtooth transaction
      const data = fs.readFileSync('/app/sample3.gif', 'utf8')
      payload.video = data;
      const txn = payload;
      console.log(`Submitting transaction to Sawtooth REST API`);
      // Wait for the response from the validator receiving the transaction
      const txnRes = await transactor.post(txn);
	console.log(txnRes);
      // Log only a few key items from the response, because it's a lot of info
      console.log({
        status: txnRes.status,
        statusText: txnRes.statusText,
      });
      return txnRes;
    } catch (err) {
      console.log("Error submitting transaction to Sawtooth REST API: ", err);
      console.log("Transaction: ", txn);
    }
  },
};

module.exports = input;
