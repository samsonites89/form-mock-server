const db = require("../db/firebase");
const {ref, get, set} = require("firebase/database");

async function getConfig() {
  const configRef = ref(db, "configs");
  const config = await get(configRef);

  return config.val();
}

async function saveConfig(secret) {
  const configRef = ref(db, "configs");
  set(configRef, {shared_secret: secret});
}


module.exports = {getConfig, saveConfig};
