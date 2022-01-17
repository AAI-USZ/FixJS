function (exports) {

  if (typeof process !== "undefined") {
    var util = require("./util.js");
  } else {
    var util = this.util;
  }

  if (typeof process !== "undefined") {
    var T = require("./estransform.js");
  } else {
    var T = estransform;
  }

  if (typeof process !== "undefined") {
    var S = require("./scope.js");
  } else {
    load("./scope.js");
  }

  /**
   * Import scopes.
   */
  const Variable = S.Variable;
  const Scope = S.Scope;
  const Frame = S.Frame;
  const getCachedLocal = S.getCachedLocal;

  const assert = util.assert;
  const quote = util.quote;
  const extend = util.extend;

  const Node = T.Node;
  const Program = T.Program;
  const FunctionDeclaration = T.FunctionDeclaration;
  const FunctionExpression = T.FunctionExpression;
  const VariableDeclaration = T.VariableDeclaration;
  const VariableDeclarator = T.VariableDeclarator;
  const ExpressionStatement = T.ExpressionStatement;
  const SequenceExpression = T.SequenceExpression;
  const AssignmentExpression = T.AssignmentExpression;
  const BlockStatement = T.BlockStatement;
  const ForStatement = T.ForStatement;
  const ForInStatement = T.ForInStatement;
  const CatchClause = T.CatchClause;
  const Identifier = T.Identifier;

  var logger;

  /**
   * Global objects
   */

  const globals = [
    "Array", "ArrayBuffer", "Boolean", "Date",
    "decodeURI", "decodeURIComponent", "encodeURI",
    "encodeURIComponent", "Error", "eval", "EvalError",
    "Float32Array", "Float64Array", "Function", "Infinity",
    "Int16Array", "Int32Array", "Int8Array", "isFinite", "isNaN",
    "Iterator", "JSON", "Math", "NaN", "Number", "Object",
    "parseFloat", "parseInt", "RangeError", "ReferenceError",
    "RegExp", "StopIteration", "String", "SyntaxError", "TypeError",
    "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray",
    "undefined", "uneval", "URIError"
  ];

  const windowGlobals = [
    "window", "document", "InstallTrigger",
    "windowGlobals", "x", "getInterface", "globalStorage",
    "addEventListener", "removeEventListener", "dispatchEvent", "dump",
    "name", "parent", "top", "self", "sessionStorage", "localStorage",
    "onmouseenter", "onmouseleave", "getSelection", "scrollByLines",
    "getComputedStyle", "location", "history", "locationbar", "menubar",
    "personalbar", "scrollbars", "statusbar", "toolbar", "status",
    "close", "stop", "focus", "blur", "length", "opener",
    "frameElement", "navigator", "applicationCache", "alert", "confirm",
    "prompt", "print", "showModalDialog", "postMessage", "atob", "btoa",
    "matchMedia", "screen", "innerWidth", "innerHeight", "scrollX",
    "pageXOffset", "scrollY", "pageYOffset", "scroll", "scrollTo",
    "scrollBy", "screenX", "screenY", "outerWidth", "outerHeight",
    "scrollByPages", "sizeToContent", "content", "closed", "crypto",
    "pkcs11", "controllers", "defaultStatus", "mozInnerScreenX",
    "mozInnerScreenY", "scrollMaxX", "scrollMaxY", "fullScreen", "back",
    "forward", "home", "moveTo", "moveBy", "resizeTo", "resizeBy",
    "updateCommands", "find", "mozPaintCount",
    "mozRequestAnimationFrame", "mozCancelAnimationFrame",
    "mozCancelRequestAnimationFrame", "mozAnimationStartTime", "URL",
    "onafterprint", "onbeforeprint", "onbeforeunload", "onhashchange",
    "onmessage", "onoffline", "ononline", "onpopstate", "onpagehide",
    "onpageshow", "onresize", "onunload", "ondevicemotion",
    "ondeviceorientation", "setTimeout", "setInterval", "clearTimeout",
    "clearInterval", "setResizable", "captureEvents", "releaseEvents",
    "routeEvent", "enableExternalCapture", "disableExternalCapture",
    "open", "openDialog", "frames", "onabort", "onblur", "oncanplay",
    "oncanplaythrough", "onchange", "onclick", "oncontextmenu",
    "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave",
    "ondragover", "ondragstart", "ondrop", "ondurationchange",
    "onemptied", "onended", "onerror", "onfocus", "oninput",
    "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload",
    "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown",
    "onmousemove", "onmouseout", "onmouseover", "onmouseup",
    "onmozfullscreenchange", "onmozfullscreenerror", "onpause",
    "onplay", "onplaying", "onprogress", "onratechange", "onreset",
    "onscroll", "onseeked", "onseeking", "onselect", "onshow",
    "onstalled", "onsubmit", "onsuspend", "ontimeupdate",
    "onvolumechange", "onwaiting", "oncopy", "oncut", "onpaste",
    "onbeforescriptexecute", "onafterscriptexecute", "mozIndexedDB",
    "performance"
  ];

  requireGlobals = ["define", "module"];

  nodeGlobals = ["global"];

  var externs = (function () {
    var externs = Object.create(null);
    var extArr = globals.concat(windowGlobals, requireGlobals, nodeGlobals);
    extArr.forEach(function (x) {
      externs[x] = true;
    });
    return externs;
  })();


  function passOverList(list, passFunction, o) {
    return list.map(function (node) {
      return node[passFunction](o);
    }).filter(function (node) {
      return node !== null;
    });
  }

  // function UniqueArray() {
  //   var arr = new Array();
  //   arr.prototype.unique = function() {
  //     var i, hashObj = Object.create(null);
  //     for (i = 0; i < this.length; i++) {
  //       hashObj[this[i]] = null;
  //     }
  //     i = 0;
  //     for (var x in hashObj) {
  //       arr[i++] = x;
  //     }
  //     return this.slice(0, i);
  //   }
  //   return arr;
  // }

  Node.prototype.jsRewrite = T.makePass("jsRewrite", "rewriteNode");

  Program.prototype.jsRewrite = function (o) {
    logger = o.logger;
    logger.push(this);
    o = extend(o);

    o.variables = Object.create(null);

    this.body = passOverList(this.body, 'jsRewrite', o);

    var variableDeclaration, variableDeclarators = [];
    for (var name in o.variables) {
      variableDeclarators.push(new VariableDeclarator(o.variables[name], null));
    }

    if (variableDeclarators.length > 0) {
      variableDeclaration = new VariableDeclaration("let", variableDeclarators);
      this.body.unshift(variableDeclaration);
    }

    logger.pop();
    return this;
  }

  FunctionExpression.prototype.jsRewrite =
  FunctionDeclaration.prototype.jsRewrite = function (o) {
    logger.push(this);

    o = extend(o);
    o.variables = Object.create(null);

    this.body = this.body.jsRewrite(o);

    var variableDeclaration, variableDeclarators = [];
    for (var name in o.variables) {
      variableDeclarators.push(new VariableDeclarator(o.variables[name], null));
    }

    if (variableDeclarators.length > 0) {
      variableDeclaration = new VariableDeclaration("let", variableDeclarators);
      if (this.body instanceof BlockStatement) {
        this.body.body.unshift(variableDeclaration);
      } else {
        this.body = new BlockStatement([variableDeclaration, this.body]);
      }
    }

    logger.pop();
    return this;
  }

  ForStatement.prototype.rewriteNode = function (o) {
    if (this.init instanceof ExpressionStatement) {
      this.init = this.init.expression;
    }
    return this;
  };

  ForInStatement.prototype.jsRewrite = function (o) {
    if (this.left instanceof VariableDeclaration) {
      assert(this.left.declarations.length === 1);
      var id = this.left.declarations[0].id;
      o.variables[id.name] = id;
      this.left = id;
    }

    Node.prototype.jsRewrite.call(this, o);
    return this;
  };

  VariableDeclaration.prototype.jsRewrite = function (o) {
    var trans, newBody = [];

    if (this.kind === "var") {
      for (var i = 0; i < this.declarations.length; i++) {
        var id = this.declarations[i].id;
        o.variables[id.name] = id;
      }
    }

    for (var i = 0, l = this.declarations.length; i < l; i++) {
      trans = this.declarations[i].jsRewrite(o);
      if (trans !== null) {
        newBody.push(trans);
      }
    }

    if (newBody.length > 0) {
      return new ExpressionStatement(new SequenceExpression(newBody), undefined, this.loc);
    } else {
      return null;
    }
  }

  VariableDeclarator.prototype.rewriteNode = function (o) {
    if (this.init) {
      return new AssignmentExpression(this.id, "=", this.init, undefined, this.init.loc);;
    }
    return null;
  }

  /**
   * extern Pass
   */

  Node.prototype.externPass = T.makePass("externPass", "externNode");

  Program.prototype.externPass = function (o) {
    var scope = o.scope = this.frame;
    o.externs = Object.create(null);

    logger.push(this);
    passOverList(this.body, 'externPass', o);
    logger.pop();

    var variableDeclaration, variableDeclarators = [];
    for (var name in o.externs) {
      variableDeclarators.push(new VariableDeclarator(o.externs[name], null));
      scope.addVariable(new Variable(name), true);
      logger.info("Adding extern " + name);
    }

    if (variableDeclarators.length > 0) {
      variableDeclaration = new VariableDeclaration("extern", variableDeclarators);
      this.body.unshift(variableDeclaration);
    }

    return this;
  };

  FunctionExpression.prototype.externPass =
  FunctionDeclaration.prototype.externPass = function (o) {
    o = extend(o);
    o.scope = this.frame;

    assert(this.body instanceof BlockStatement);
    passOverList(this.body.body, 'externPass', o);

    return this;
  };

  ForStatement.prototype.externPass = function (o) {
    o = extend(o);
    o.scope = this.scope;
    return Node.prototype.externPass.call(this, o);
  };

  BlockStatement.prototype.externPass = function (o) {
    o = extend(o);
    o.scope = this.scope;
    passOverList(this.body, 'externPass', o);
    return this;
  };

  CatchClause.prototype.externPass = function (o) {
    this.body.externPass(o);
    return this;
  };

  Identifier.prototype.externNode = function (o) {
    if (this.kind === "variable" && !this.variable) {
      var scope = o.scope;
      var variable = scope.getVariable(this.name);

      if (!variable) {
        o.externs[this.name] = this;
        if (!externs[this.name]) {
          logger.warn("unknown identifier " + quote(this.name) + " in scope " + scope);
        }
      }
    }
  }

  function initialize(o) {
    logger = o.logger;
  }

  exports.initialize = initialize;

}).call(this, typeof exports === "undefined" ? (jsFrontend = {}