function DisplayVerificationData(cert, result)
{
  document.getElementById("verify_pending").setAttribute("hidden", "true");

  if (!result || !cert)
    return; // no results could be produced

  if (!(cert instanceof Components.interfaces.nsIX509Cert))
    return;

  //  Verification and usage
  var verifystr = "";
  var o1 = {};
  var o2 = {};
  var o3 = {};

  if (!(result instanceof Components.interfaces.nsICertVerificationResult))
    return;

  result.getUsagesArrayResult(o1, o2, o3);

  var verifystate = o1.value;
  var count = o2.value;
  var usageList = o3.value;
  if (verifystate == cert.VERIFIED_OK) {
    verifystr = bundle.GetStringFromName('certVerified');
  } else if (verifystate == cert.CERT_REVOKED) {
    verifystr = bundle.GetStringFromName('certNotVerified_CertRevoked');
  } else if (verifystate == cert.CERT_EXPIRED) {
    verifystr = bundle.GetStringFromName('certNotVerified_CertExpired');
  } else if (verifystate == cert.CERT_NOT_TRUSTED) {
    verifystr = bundle.GetStringFromName('certNotVerified_CertNotTrusted');
  } else if (verifystate == cert.ISSUER_NOT_TRUSTED) {
    verifystr = bundle.GetStringFromName('certNotVerified_IssuerNotTrusted');
  } else if (verifystate == cert.ISSUER_UNKNOWN) {
    verifystr = bundle.GetStringFromName('certNotVerified_IssuerUnknown');
  } else if (verifystate == cert.INVALID_CA) {
    verifystr = bundle.GetStringFromName('certNotVerified_CAInvalid');
  } else { /* if (verifystate == cert.NOT_VERIFIED_UNKNOWN || == USAGE_NOT_ALLOWED) */
    verifystr = bundle.GetStringFromName('certNotVerified_Unknown');
  }
  var verified=document.getElementById('verified');
  verified.textContent = verifystr;
  if (count > 0) {
    var verifyInfoBox = document.getElementById('verify_info_box');
    for (var i=0; i<count; i++) {
      AddUsage(usageList[i],verifyInfoBox);
    }
  }
}