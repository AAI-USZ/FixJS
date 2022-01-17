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
    jwcrypto.addEntropy(result.random_seed);
  }