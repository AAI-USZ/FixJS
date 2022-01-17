function(assertionParams, params) {
  // copy over only the parameters we care about into params
  params.iat = assertionParams.issuedAt ? assertionParams.issuedAt.valueOf() : undefined;
  params.exp = assertionParams.expiresAt ? assertionParams.expiresAt.valueOf() : undefined;
  params.iss = assertionParams.issuer;
  params.aud = assertionParams.audience;
}