function(node) {
  this._filename = node.getAttribute("filename");
  this._basedir = node.getAttribute("basedir") || ".";
  this._downloadURL = node.getAttribute("installurl") || null;
  this.updateURL = node.getAttribute("updateurl") || null;

  if (!this.fileExists(this._basedirFile)) return;
  if (!this.fileExists(this.file)) return;

  if (!node.hasAttribute("modified")
      || !node.hasAttribute("dependhash")
      || !node.hasAttribute("version")
  ) {
    var scope = {};
    Components.utils.import('resource://greasemonkey/parseScript.js', scope);
    var parsedScript = scope.parse(
        this.textContent, GM_util.uriFromUrl(this._downloadURL));

    this._modifiedTime = this.file.lastModifiedTime;
    this._dependhash = GM_util.sha1(parsedScript._rawMeta);
    this._version = parsedScript._version;

    this._changed('modified', null);
  } else {
    this._modifiedTime = parseInt(node.getAttribute("modified"), 10);
    this._dependhash = node.getAttribute("dependhash");
    this._version = node.getAttribute("version");
  }

  if (!node.getAttribute("updateAvailable")
      || !node.getAttribute("lastUpdateCheck")
  ) {
    this.updateAvailable = false;
    this._lastUpdateCheck = this._modifiedTime;

    this_changed('modified', null);
  } else {
    this.updateAvailable = node.getAttribute("updateAvailable") == 'true';
    this._updateVersion = node.getAttribute("updateVersion") || null;
    this._lastUpdateCheck = parseInt(node.getAttribute("lastUpdateCheck"), 10);
  }

  this.checkRemoteUpdates = node.hasAttribute('checkRemoteUpdates')
      ? node.getAttribute('checkRemoteUpdates') == 'true' : true;

  if (!node.hasAttribute("installTime")) {
    this._installTime = new Date().getTime();
    this._changed('modified', null);
  } else {
    this._installTime = parseInt(node.getAttribute("installTime"), 10);
  }

  this._uuid = node.getAttribute("uuid");

  for (var i = 0, childNode; childNode = node.childNodes[i]; i++) {
    switch (childNode.nodeName) {
    case "Exclude":
      this._excludes.push(childNode.textContent);
      break;
    case "Grant":
      this._grants.push(childNode.textContent);
      break;
    case "Include":
      this._includes.push(childNode.textContent);
      break;
    case "UserInclude":
      this._userIncludes.push(childNode.textContent);
      break;
    case "UserExclude":
      this._userExcludes.push(childNode.textContent);
      break;
    case "Match":
      this._matches.push(new MatchPattern(childNode.textContent));
      break;
    case "Require":
      var scriptRequire = new ScriptRequire(this);
      scriptRequire._filename = childNode.getAttribute("filename");
      this._requires.push(scriptRequire);
      break;
    case "Resource":
      var scriptResource = new ScriptResource(this);
      scriptResource._name = childNode.getAttribute("name");
      scriptResource._filename = childNode.getAttribute("filename");
      scriptResource._mimetype = childNode.getAttribute("mimetype");
      scriptResource._charset = childNode.getAttribute("charset");
      this._resources.push(scriptResource);
      break;
    case "Unwrap":
      this._unwrap = true;
      break;
    }
  }

  this.checkConfig();
  this._name = node.getAttribute("name");
  this._namespace = node.getAttribute("namespace");
  this._description = node.getAttribute("description");
  this._runAt = node.getAttribute("runAt") || "document-end"; // legacy default
  this.icon.fileURL = node.getAttribute("icon");
  this._enabled = node.getAttribute("enabled") == true.toString();
}