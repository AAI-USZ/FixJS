function() {
      var code, fn;
      fn = '';
      code = this.createCode();
      if (code.indexOf('$e') !== -1) {
        if (this.options.customHtmlEscape) {
          fn += "$e = " + this.options.customHtmlEscape + "\n";
        } else {
          fn += "$e = (text, escape) ->\n  \"\#{ text }\"\n  .replace(/&/g, '&amp;')\n  .replace(/</g, '&lt;')\n  .replace(/>/g, '&gt;')\n  .replace(/\'/g, '&#39;')\n  .replace(/\"/g, '&quot;')\n";
        }
      }
      if (code.indexOf('$c') !== -1) {
        if (this.options.customCleanValue) {
          fn += "$c = " + this.options.customCleanValue + "\n";
        } else {
          fn += "$c = (text) ->\n";
          fn += "   switch text\n";
          fn += "     when null, undefined then ''\n";
          fn += "     when true, false then '\u0093' + text\n";
          fn += "     else text\n";
        }
      }
      if (code.indexOf('$p') !== -1 || code.indexOf('$fp') !== -1) {
        if (this.options.customPreserve) {
          fn += "$p = " + this.options.customPreserve + "\n";
        } else {
          fn += "$p = (text) -> text.replace /\\n/g, '&#x000A;'\n";
        }
      }
      if (code.indexOf('$fp') !== -1) {
        if (this.options.customFindAndPreserve) {
          fn += "$fp = " + this.options.customFindAndPreserve + "\n";
        } else {
          fn += "$fp = (text) ->\n  text.replace /<(" + (this.options.preserveTags.split(',').join('|')) + ")>([^]*?)<\\/\\1>/g, (str, tag, content) ->\n    \"<\#{ tag }>\#{ $p content }</\#{ tag }>\"\n";
        }
      }
      if (code.indexOf('surround') !== -1) {
        if (this.options.customSurround) {
          fn += "surround = " + this.options.customSurround + "\n";
        } else {
          fn += "surround = (start, end, fn) -> start + fn() + end\n";
        }
      }
      if (code.indexOf('succeed') !== -1) {
        if (this.options.customSucceed) {
          fn += "succeed = " + this.options.customSucceed + "\n";
        } else {
          fn += "succeed = (end, fn) -> fn() + end\n";
        }
      }
      if (code.indexOf('precede') !== -1) {
        if (this.options.customPrecede) {
          fn += "precede = " + this.options.customPrecede + "\n";
        } else {
          fn += "precede = (start, fn) -> start + fn()\n";
        }
      }
      fn += "$o = []\n";
      fn += "" + code + "\n";
      return fn += "return $o.join(\"\\n\")" + (this.convertBooleans(code)) + (this.cleanupWhitespace(code)) + "\n";
    }