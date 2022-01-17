function externalLink() {                                            // opened up fireFTP using a link in Firefox
  var site = { account  : "", host     : "",            port             : 21,    login          : "anonymous", password : "fireftp@example.com", anonymous : true,
               security : "", pasvmode : gTempPasvMode, ipmode           : false, treesync       : false,       localdir : "",                    remotedir : "",
               webhost  : "", prefix   : "",            downloadcasemode : 0,     uploadcasemode : 0,           encoding : "UTF-8",
               notes    : "", timezone : 0,             folder           : "",    privatekey     : "",          protocol : "",
               temporary : true };

  var uri    = Components.classes["@mozilla.org/network/standard-url;1"].getService(Components.interfaces.nsIURI);
  var toUTF8 = Components.classes["@mozilla.org/intl/utf8converterservice;1"].getService(Components.interfaces.nsIUTF8ConverterService);
  uri.spec   = gLoadUrl;

  if (!(uri.schemeIs("ftp") || uri.schemeIs("sftp") || uri.schemeIs("ftps")) || gLoadUrl.length <= 6) {                // sanity check
    return;
  }

  if (uri.username) {
    site.login     = unescape(uri.username);
    site.password  = unescape(uri.password);
    site.anonymous = site.login && site.login != "anonymous" ? false : true;
  }

  site.host = uri.host;
  site.port = uri.port == -1 ? (uri.schemeIs("sftp") ? 22 : 21) : uri.port;

  try {
    var recordedHost = (site.host.indexOf("ftp.") == 0 ? '' : "ftp.") + site.host + ':' + site.port;
    var logins = gLoginManager.findLogins({}, recordedHost, "FireFTP", null);
    for (var x = 0; x < logins.length; ++x) {
      if (uri.username && logins[x].username != site.login) {
        continue;
      }

      site.login = logins[x].username;
      site.password = logins[x].password;
      site.anonymous = site.login && site.login != "anonymous" ? false : true;
      break;
    }
  } catch (ex) { }

  if (uri.schemeIs("sftp")) {
    site.security = "sftp";

    site.privatekey = getArgument('?' + window.location.hash.substring(1), 'pkey');
  } else if (uri.schemeIs("ftps")) {
    site.security = "authtls";
  }

  site.protocol = uri.schemeIs("sftp") ? "ssh2" : "ftp";

  var prefBranch   = gPrefsService.getBranch("browser.");

  // get rid of the hash, e.g. when using #pkey=<file>
  uri.path = uri.path.substring(0, uri.path.lastIndexOf('#'));

  // test to see if the path is a file or directory, rudimentary test to see if slash is at the end
  gLoadUrl         = uri.path.charAt(uri.path.length - 1) == '/' ? "" : unescape(uri.path);

  try {
    gLoadUrl       = toUTF8.convertStringToUTF8(gLoadUrl, "UTF-8", 1);
  } catch (ex) {
    debug(ex);
  }

  try {
    if (prefBranch.getBoolPref("download.useDownloadDir")) {
      site.localdir  = prefBranch.getComplexValue("download.dir", Components.interfaces.nsISupportsString).data;
    }
  } catch (ex) { }

  site.remotedir = gLoadUrl == "" ? (uri.path == "/" ? "" : unescape(uri.path)) : unescape(uri.path.substring(0, uri.path.lastIndexOf('/')));

  try {
    site.remotedir = toUTF8.convertStringToUTF8(site.remotedir, "UTF-8", 1);
  } catch (ex) {
    debug(ex);
  }

  gPrefs.setCharPref("loadurl", "");

  tempAccountHelper(site);
}