function RegExpClass(runtime, scope, instance, baseClass) {
    function ASRegExp(pattern, flags) {
      function stripFlag(flags, c) {
        flags[flags.indexOf(c)] = flags[flags.length - 1];
        return flags.substr(0, flags.length - 1);
      }

      if (flags) {
        var re;
        var extraProps = {};

        if (flags.indexOf("s") >= 0) {
          pattern = pattern.replace(/\./, "(.|\n)");
          flags = stripFlags(flags, "s");
          extraProps.push({ key: "dotall", value: true });
        }

        re = new RegExp(pattern, flags);

        for (var i = 0, j = extraProps.length; i < j; i++) {
          var prop = extraProps[i];
          re[prop.key] = prop.value;
        }

        return re;
      }

      return new RegExp(pattern, flags);
    }
    ASRegExp.prototype = RegExp.prototype;

    var c = new Class("RegExp", ASRegExp, C(ASRegExp));
    c.baseClass = baseClass;

    var m = RegExp.prototype;
    defineNonEnumerableProperty(m, "get global", function () { return this.global; });
    defineNonEnumerableProperty(m, "get source", function () { return this.source; });
    defineNonEnumerableProperty(m, "get ignoreCase", function () { return this.ignoreCase; });
    defineNonEnumerableProperty(m, "get multiline", function () { return this.multiline; });
    defineNonEnumerableProperty(m, "get lastIndex", function () { return this.lastIndex; });
    defineNonEnumerableProperty(m, "set lastIndex", function (i) { this.lastIndex = i; });
    defineNonEnumerableProperty(m, "get dotall", function () { return this.dotall; });
    defineNonEnumerableProperty(m, "get extended", function () { return this.extended; });
    c.nativeMethods = m;

    return c;
  }