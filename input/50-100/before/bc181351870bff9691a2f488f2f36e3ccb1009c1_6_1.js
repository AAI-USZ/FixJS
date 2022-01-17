function onContextChange(msg, result) {
    context = result;
    server_time = {
      remote: result.server_time,
      local: (new Date()).getTime()
    };
    domain_key_creation_time = result.domain_key_creation_time;
    auth_status = result.auth_level;
    code_version = result.code_version;
    setUserID(result.userid);

    // seed the PRNG
    // FIXME: properly abstract this out, probably by exposing a jwcrypto
    // interface for randomness
    // require("./libs/all").sjcl.random.addEntropy(result.random_seed);
    // FIXME: this wasn't doing anything for real, so commenting this out for now
  }