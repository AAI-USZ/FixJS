function(encrypted, options, callback) {
  if(encrypted.cipherAlgorithm !== 'rsa-aes-128-cbc') {
    var algorithm = encrypted.cipherAlgorithm;
    return callback(new Error('[payswarm.decrypt] ' +
      'Unknown encryption algorithm "' + algorithm + '"'));
  }

  try {
    // private key decrypt key and IV
    var keypair = rsa.createRsaKeypair({
      privateKey: options.privateKey
    });
    var key = keypair.decrypt(encrypted.cipherKey, 'base64', 'binary');
    var iv = keypair.decrypt(
      encrypted.initializationVector, 'base64', 'binary');

    // symmetric decrypt data
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decrypted = decipher.update(encrypted.cipherData, 'base64', 'utf8');
    decrypted += decipher.final('base64');

    // return parsed result
    var result = JSON.parse(decrypted);
    callback(null, result);
  }
  catch(ex) {
    callback(new Error('[payswarm.decrypt] ' +
      'Failed to decrypt the encrypted message.'));
  }
}