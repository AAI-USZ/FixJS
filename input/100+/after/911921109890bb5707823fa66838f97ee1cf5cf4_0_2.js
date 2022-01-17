function(xml) {

  this.validationErrors = []

  this.signedXml = xml



  if (!this.keyInfoProvider) {

    throw new Error("cannot validate signature since no key info resolver was provided")

  }



  this.signingKey = this.keyInfoProvider.getKey(this.keyInfo)

  if (!this.signingKey) throw new Error("key info provider could not resolve key info " + this.keyInfo)



  var doc = new Dom().parseFromString(xml)



  if (!this.validateReferences(doc))

    return false



  if (!this.validateSignatureValue(doc))

    return false



  return true

}