function() {
      var baseclass, item, klass, repl, requirements, rgx, rgx_ext, _i, _j, _len, _len1, _ref, _ref1, _results;
      this.raw = fs.readFileSync(this.realpath, "utf-8");
      this.dependencies_collapsed = [];
      this.baseclasses = [];
      this.filepath = this.realpath.replace(this.folderpath, "").substr(1);
      if (this.alias != null) {
        this.filepath = pn("" + this.alias + "/" + this.filepath);
      }
      this.filename = /[\w-]+\.[\w-]+/.exec(this.filepath)[0];
      this.filefolder = this.filepath.replace("/" + this.filename, "") + "/";
      this.namespace = "";
      if (this.filepath.indexOf("/") === -1) {
        this.filefolder = "";
      }
      this.namespace = this.filefolder.replace(/\//g, ".").slice(0, -1);
      rgx = /^\s*(class)+\s(\w+)(\s+(extends)\s+([\w.]+))?/gm;
      rgx_ext = /(^|=\s*)(class)\s(\w+)\s(extends)\s(\\w+)\s*$/gm;
      if (this.raw.match(rgx) != null) {
        this.classpath = this.classname;
        if (this.namespace !== "" && this.builder.packaging) {
          repl = "$1 __t('" + this.namespace + "').$2$3";
          this.raw = this.raw.replace(rgx, repl);
          this.classpath = "" + this.namespace + "." + this.classname;
        }
        this.classname = this.raw.match(rgx)[3];
        _ref1 = (_ref = this.raw.match(rgx_ext)) != null ? _ref : [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          klass = _ref1[_i];
          baseclass = klass.match(rgx_ext)[5];
          this.baseclasses.push(baseclass);
        }
      }
      if (/(#<<\s)(.*)/g.test(this.raw)) {
        requirements = this.raw.match(/(#<<\s)(.*)/g);
        _results = [];
        for (_j = 0, _len1 = requirements.length; _j < _len1; _j++) {
          item = requirements[_j];
          item = /(#<<\s)(.*)/.exec(item)[2];
          item = item.replace(/\s/g, "");
          item = [].concat(item.split(","));
          _results.push(this.dependencies_collapsed = this.dependencies_collapsed.concat(item));
        }
        return _results;
      }
    }