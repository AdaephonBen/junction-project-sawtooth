const { EnclaveFactory } = require("./enclave");
const { SawtoothClientFactory } = require("./sawtooth-client");
const argv = require("yargs")
  .command("register_event", "register a new event", {
    id: {
      describe: "Car ID",
    },
    latitude: {
      describe: "Latitude",
    },
    longitude: {
      describe: "Longitude",
    },
    orientation: {
      describe: "Orientation",
    },
    metadata: { describe: "Metadata" },
  })
  .command("get_event", "Get event details", {
    id: { describe: "Car ID" },
  })
  .help("h")
  .alias("h", "help").argv;

console.log(argv);

const env = require("./env");
const input = require("./input");

const enclave = EnclaveFactory();

console.log(enclave);

const junctionClient = SawtoothClientFactory({
  enclave: enclave,
  restApiUrl: env.restApiUrl,
});

const junctionTransactor = junctionClient.newTransactor({
  familyName: env.familyName,
  familyVersion: env.familyVersion,
});

const newPayload = {
  id: argv.id,
  action: argv._[0],
};

if (newPayload.action === "register_event") {
  newPayload.data = {
    car_id: argv.id,
    latitude: argv.latitude,
    longitude: argv.longitude,
    orientation: argv.orientation,
    metadata: argv.metadata,
  };
}

console.log(newPayload);

if (input.payloadIsValid(newPayload)) {
	console.log("Hello")
  input.submitPayload(newPayload, junctionTransactor);
} else {
  console.log(`Oops! Your payload failed validation and was not submitted.`);
}
