function extractAssertionParamsFrom(params) {
  var assertionParams = {};
  assertionParams.issuedAt = utils.getDate(params.iat);
  assertionParams.expiresAt = utils.getDate(params.exp);
  assertionParams.issuer = params.iss;
  assertionParams.audience = params.aud;

  delete params.iat;
  delete params.exp;
  delete params.iss;
  delete params.aud;
  return assertionParams;
}