function checkConfiguration(config) {
  log.info("Your device has not been enrolled to PZH yet");
  console.log(config);
  if (config.pzhHost === "") {
    log.error("pzhHost should be ip address or a domain name, by default value it is localhost");
    return false;
  }
  if (config.pzhName === "") {
    log.error("pzhName should not be empty, please enter your full name as it appears on PZH farm page");
    log.error("./webinos_pzp.js --auth-code=\"<code>\"  --pzh-name=\"<fullname>\"");
    return false;
  }  
  if (config.code === "DEBUG") {
    log.error("No authorization code specified, please generate code on PZH and enter while starting PZP");
    log.error("./webinos_pzp.js --auth-code=\"<code>\"  --pzh-name=\"<fullname>\"");
    return false;
  }
  return true;
}