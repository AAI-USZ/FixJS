function (csr, config, name, type, callback) {
    try {
        session_configuration.fetchKey(config.master.key_id, function(master_key){
            // connection certificate signed by master certificate
            certificate.signRequest(csr, master_key, config.master.cert, type, config.serverName, function(result, signed_cert) {
                if(result === "certSigned") {
                    log("INFO", "[CONFIG] Generated Signed Certificate by CA");
                    try {
                        if(type === 1 || type === 0) { // PZH
                            config.own.cert = signed_cert; // Signed connection certificate
                        } else {
                            config.signedCert[name] = signed_cert;
                        }

                        // Update with the signed certificate
                        session_configuration.storeConfig(config, function() {
                            callback(config);
                        });
                    } catch (err1) {
                        log("ERROR","[CONFIG] Error setting paramerters" + err1) ;
                        callback("undefined");
                        return;
                    }
                }
            });
        });
    } catch (err){
        log("ERROR", "[CONFIG] Error in generating signed certificate by CA" + err);
        callback("undefined");
    }
}