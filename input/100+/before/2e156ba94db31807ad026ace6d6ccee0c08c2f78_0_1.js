function updateCertStatus() {
  var shortDesc, longDesc;
  var shortDesc2, longDesc2;
  var shortDesc3, longDesc3;
  var use2 = false;
  var use3 = false;
  if(gCert) {
    if(gBroken) { 
      var mms = "addExceptionDomainMismatchShort";
      var mml = "addExceptionDomainMismatchLong";
      var exs = "addExceptionExpiredShort";
      var exl = "addExceptionExpiredLong";
      var uts = "addExceptionUnverifiedShort";
      var utl = "addExceptionUnverifiedLong";
      var use1 = false;
      if (gSSLStatus.isDomainMismatch) {
        use1 = true;
        shortDesc = mms;
        longDesc  = mml;
      }
      if (gSSLStatus.isNotValidAtThisTime) {
        if (!use1) {
          use1 = true;
          shortDesc = exs;
          longDesc  = exl;
        }
        else {
          use2 = true;
          shortDesc2 = exs;
          longDesc2  = exl;
        }
      }
      if (gSSLStatus.isUntrusted) {
        if (!use1) {
          use1 = true;
          shortDesc = uts;
          longDesc  = utl;
        }
        else if (!use2) {
          use2 = true;
          shortDesc2 = uts;
          longDesc2  = utl;
        } 
        else {
          use3 = true;
          shortDesc3 = uts;
          longDesc3  = utl;
        }
      }
      
      // In these cases, we do want to enable the "Add Exception" button
      gDialog.getButton("extra1").disabled = false;

      // If the Private Browsing service is available and the mode is active,
      // don't store permanent exceptions, since they would persist after
      // private browsing mode was disabled.
      var inPrivateBrowsing = inPrivateBrowsingMode();
      var pe = document.getElementById("permanent");
      pe.disabled = inPrivateBrowsing;
      pe.checked = !inPrivateBrowsing;

      setText("headerDescription", gPKIBundle.GetStringFromName("addExceptionInvalidHeader"));
    }
    else {
      shortDesc = "addExceptionValidShort";
      longDesc  = "addExceptionValidLong";
      gDialog.getButton("extra1").disabled = true;
      document.getElementById("permanent").disabled = true;
    }

    // We're done checking the certificate, so allow the user to check it again.
    document.getElementById("checkCertButton").disabled = false;
    document.getElementById("viewCertButton").disabled = false;

    // Notify observers about the availability of the certificate
    Components.classes["@mozilla.org/observer-service;1"]
              .getService(Components.interfaces.nsIObserverService)
              .notifyObservers(null, "cert-exception-ui-ready", null);
  }
  else if (gChecking) {
    shortDesc = "addExceptionCheckingShort";
    longDesc  = "addExceptionCheckingLong";
    // We're checking the certificate, so we disable the Get Certificate
    // button to make sure that the user can't interrupt the process and
    // trigger another certificate fetch.
    document.getElementById("checkCertButton").disabled = true;
    document.getElementById("viewCertButton").disabled = true;
    gDialog.getButton("extra1").disabled = true;
    document.getElementById("permanent").disabled = true;
  }
  else {
    shortDesc = "addExceptionNoCertShort";
    longDesc  = "addExceptionNoCertLong";
    // We're done checking the certificate, so allow the user to check it again.
    document.getElementById("checkCertButton").disabled = false;
    document.getElementById("viewCertButton").disabled = true;
    gDialog.getButton("extra1").disabled = true;
    document.getElementById("permanent").disabled = true;
  }
  
  setText("statusDescription", gPKIBundle.GetStringFromName(shortDesc));
  setText("statusLongDescription", gPKIBundle.GetStringFromName(longDesc));

  if (use2) {
    setText("status2Description", gPKIBundle.GetStringFromName(shortDesc2));
    setText("status2LongDescription", gPKIBundle.GetStringFromName(longDesc2));
  }

  if (use3) {
    setText("status3Description", gPKIBundle.GetStringFromName(shortDesc3));
    setText("status3LongDescription", gPKIBundle.GetStringFromName(longDesc3));
  }

  gNeedReset = true;
}