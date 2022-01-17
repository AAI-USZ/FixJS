function selfSignedMasterCert(config, callback){
  try {
    certificate.selfSigned(config, config.type+"CA", function(result, selfSignErr, master_key, master_cert) {
      if(result === "certGenerated") {
        log("INFO", "[CONFIG] Generated CA Certificate");
        // Store all master certificate information
        config.master.cert = master_cert.cert;
        config.master.crl  = master_cert.crl;
        session_configuration.storeKey(config.master.key_id, master_key);
        session_configuration.storeConfig(config, function() {
          callback(config);
        });
      } else {
        log("ERROR", "Error in generting certificate");
      }
    });
  } catch (err) {
    log("ERROR", "[CONFIG] Error in generating master self signed certificate " + err);
    callback("undefined");
  }
}