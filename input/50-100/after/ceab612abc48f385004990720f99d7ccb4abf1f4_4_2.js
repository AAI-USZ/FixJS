function(err, payload, assertionParams, certParams) {
      if (err) return cb(err);

      i += 1;
      certParamsArray.push({payload: payload,
                            assertionParams: assertionParams,
                            certParams: certParams});
      
      if (i >= certs.length)
        cb(null, certParamsArray, certParams.publicKey);
      else
        delay(verifyCert)(i, certParams.publicKey, certParamsArray, cb);
    }