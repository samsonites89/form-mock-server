const {getConfig} = require("./config-service");
const crypto = require("crypto");

async function CreateFormUriPayload(url, body) {
  if (body.external_form_id === undefined ||
    body.smart_action_id === undefined) {
    throw new Error("required params missing." +
    "requires `external_form_id` and `snart_action_id`");
  }


  const secret = await getSecret();

  const payload = {
    external_form_id: body.external_form_id,
    smart_action_id: body.smart_action_id,
    uri: url+"/form?smart_action_id=" + body.smart_action_id,

  };
  Object.keys(payload).sort();
  const signature = generateSignature(secret, payload);

  const response = {
    type: "form_data",
    signature: signature,
    data: payload,
  };

  return response;
}

async function CreateFormCompletedPayload(requestBody) {
  const secret = await getSecret();

  const payload = {};

  if (requestBody.status !== "success") {
    payload.details = details(requestBody.status);
  }

  payload.smart_action_id = Number(requestBody.smart_action_id);
  payload.status = requestBody.status;
  payload.timestamp = new Date().toISOString();


  Object.keys(payload).sort();
  console.log(payload);
  const signature = generateSignature(secret, payload);

  const response = {
    type: "form_complete",
    signature: signature,
    data: payload,
  };

  return response;
}

function generateSignature(secret, payload) {
  const hmac = crypto.createHmac("sha256", secret);
  console.log(JSON.stringify(sort(payload)));
  const data = hmac.update(JSON.stringify(sort(payload)));

  // Creating the hmac in the required format
  return data.digest("base64");
}

// eslint-disable-next-line require-jsdoc
function sort(payload) {
  const map = new Map(Object.entries(payload).sort());
  return Object.fromEntries(map);
}

async function getSecret() {
  const config = await getConfig();
  return config.shared_secret;
}

function details(status) {
  if (status === "error") {
    return {
      error_code: "400",
      message: "validation error",
    };
  } else if (status === "cancelled") {
    return {
      message: "User cancelled the form submission.",
    };
  }
}


module.exports = {CreateFormUriPayload, CreateFormCompletedPayload};
