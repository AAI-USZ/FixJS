function(status, selfSignErr, conn_key, conn_cert, csr ) {
          if(status === "certGenerated") {
            session_configuration.storeKey(config.own.key_id, conn_key);
            log.info("generated connection certificates");
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
                log.error("storing configuration"+ err);
                return;
              }
            }
          } else {
            log.error("generating self signed cert: ");
            callback("undefined");
          }
        }