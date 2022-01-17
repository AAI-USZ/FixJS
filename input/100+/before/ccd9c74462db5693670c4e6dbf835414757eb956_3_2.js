function(err, data) {
    if ( err && err.code=== "ENOENT" ) {
      // CREATE NEW CONFIGURATION
      var config = createConfigStructure(name, type);
      config.name = name;
      config.serverName = url;
      // This self signed certificate is for getting connection certificate CSR.
      try {  // From this certificate generated only csr is used
        certificate.selfSigned(config, type, function(status, selfSignErr, conn_key, conn_cert, csr ) {
          if(status === "certGenerated") {
            session_configuration.storeKey(config.own.key_id, conn_key);
            log.info("generated CONN Certificates");
            if (type !== "Pzp") {
              // This self signed certificate is  master certificate / CA
              selfSignedMasterCert(config, function(config_master){
                // Sign connection certifcate
                session_configuration.signedCert(csr, config_master, null, 1, function(config_signed) { // PZH CONN CERT 1
                  callback(config_signed, conn_key);
                });
              });
            } else {
              // PZP will only generate only 1 certificate
              try{
                  // Used for initial connection, will be replaced by cert received from PZH
                config.own.cert = conn_cert.cert;
                config.csr      = csr;
                session_configuration.storeConfig(config, function() {
                  callback(config, conn_key, config.csr);
                });
              } catch (err) {
                log.error("storing key in key store "+ err);
                return;
              }
            }
          } else {
            log.error("generating Self Signed Cert: ");
            callback("undefined");
          }
        });
      } catch (err) {
        log.error("generating certificates" + err);
        callback("undefined");
      }
    } else { // When configuration already exists, just load configuration file
        var configData = data.toString("utf8");
        config = JSON.parse(configData);
        if (config.master.cert === "" ){
          session_configuration.fetchKey(config.own.key_id, function(conn_key){
            callback(config, conn_key, config.csr);
          });
        } else {
          session_configuration.fetchKey(config.own.key_id, function(conn_key){
            callback(config, conn_key);
          });
        }
    }
  }