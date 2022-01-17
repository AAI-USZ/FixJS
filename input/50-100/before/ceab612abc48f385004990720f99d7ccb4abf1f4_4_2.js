function(err, payload, assertionParams, certParams) {
      if (err) return cb(err);

      i += 1;
      certParamsArray.push({payload: payload,
                            assertionParams: assertionParams,
                            certParams: certParams});
      
      if (i >= certs.length)
        cb(null, certParamsArray, certParams['public-key']);
      else
        delay(verifyCert)(i, certParams['public-key'], certParamsArray, cb);
    }