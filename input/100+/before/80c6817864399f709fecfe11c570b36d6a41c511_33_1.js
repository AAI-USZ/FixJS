function(_super) {

    __extends(ReadXmlPipe, _super);

    ReadXmlPipe.name = 'ReadXmlPipe';

    function ReadXmlPipe(log, startDepth) {
      this.startDepth = startDepth != null ? startDepth : 0;
      this.onerror = __bind(this.onerror, this);

      this.ontext = __bind(this.ontext, this);

      this.onclosetag = __bind(this.onclosetag, this);

      this.onopentag = __bind(this.onopentag, this);

      this.processData = __bind(this.processData, this);

      this.spec = {};
      this.stringBuffer = '';
      this.fst = {};
      this.entryActions = {};
      this.exitActions = {};
      this.guards = {};
      this.elementCount = 0;
      this.pathStack = [];
      this.attrsStack = [];
      this.path = '';
      this.fullPath = '';
      this.rootTag = '';
      this.parser = sax.parser(true, {
        trim: true,
        normalize: true
      });
      this.parser.onopentag = this.onopentag;
      this.parser.onclosetag = this.onclosetag;
      this.parser.ontext = this.ontext;
      this.parser.onerror = this.onerror;
      ReadXmlPipe.__super__.constructor.apply(this, arguments);
    }

    ReadXmlPipe.prototype.processData = function(data) {
      return this.parser.write(this.bufferToStr(data));
    };

    ReadXmlPipe.prototype.parseURN = function(urn) {
      var ref, result;
      ref = {};
      result = urn.match(/^urn:\S*\=(\w+):(\w+)\((\S*)\)\.*(\w*)/);
      if (result != null) {
        ref.agencyID = result[1];
        if (0 < result[4].length) {
          ref.maintainableParentID = result[2];
          ref.maintainableParentVersion = result[3];
          ref.id = result[4];
        } else {
          ref.id = result[2];
          ref.version = result[3];
        }
      }
      return ref;
    };

    ReadXmlPipe.prototype.parseTag = function(name) {
      if (name.indexOf(':') !== -1) {
        return {
          prefix: name.split(':')[0],
          localPart: name.split(':')[1]
        };
      }
      return {
        localPart: name
      };
    };

    ReadXmlPipe.prototype.convertBool = function(attrs, attr) {
      if (attrs[attr] != null) {
        return attrs[attr] = attrs[attr] === 'true';
      }
    };

    ReadXmlPipe.prototype.currentNamespace = function(key, level) {
      if (level == null) {
        level = this.attrsStack.length - 1;
      }
      if (level < 0) {
        throw "Undefined namespace " + key;
      }
      if (this.attrsStack[level][key] != null) {
        return this.attrsStack[level][key];
      }
      return this.currentNamespace(key, level - 1);
    };

    ReadXmlPipe.prototype.nameSpaceForElement = function(qualifiedName) {
      var key;
      key = 'xmlns' + (qualifiedName.prefix != null ? ':' + qualifiedName.prefix : '');
      return this.currentNamespace(key);
    };

    ReadXmlPipe.prototype.onRootElement = function(qualifiedName, tag) {
      var namespace;
      this.rootTag = qualifiedName.localPart;
      namespace = this.nameSpaceForElement(qualifiedName);
      if (namespace == null) {
        throw "No namespace for root element";
      }
      if (handlers[namespace] == null) {
        throw "Unexpected namespace " + namespace;
      }
      if (handlers[namespace][this.rootTag] == null) {
        throw "Unexpected root element " + this.rootTag;
      }
      this.fst = handlers[namespace][this.rootTag].fst;
      this.entryActions = handlers[namespace][this.rootTag].entryActions;
      this.exitActions = handlers[namespace][this.rootTag].exitActions;
      return this.guards = handlers[namespace][this.rootTag].guards;
    };

    ReadXmlPipe.prototype.onopentag = function(tag) {
      var qualifiedName, tagName;
      qualifiedName = this.parseTag(tag.name);
      tagName = qualifiedName.localPart;
      this.pathStack.push(tagName);
      this.attrsStack.push(tag.attributes);
      if (this.pathStack.length < this.startDepth) {
        return;
      }
      this.elementCount += 1;
      this.path = this.pathStack.slice(this.startDepth + 1).join('/');
      this.fullPath = this.pathStack.join('/');
      try {
        if (this.elementCount === 1) {
          this.onRootElement(qualifiedName, tag);
          return;
        }
        if (this.guards[this.path] != null) {
          this.guards[this.path].call(this, tag.attributes);
        }
        if (this.entryActions[this.path] != null) {
          return this.entryActions[this.path].call(this, tag.attributes);
        }
      } catch (error) {
        return this.log.error("XMLReader " + error + " on line " + (this.parser.line + 1));
      }
    };

    ReadXmlPipe.prototype.onclosetag = function(tag) {
      var attrs, qualifiedName, tagName;
      qualifiedName = this.parseTag(tag);
      tagName = qualifiedName.localPart;
      attrs = this.attrsStack.pop();
      if (this.exitActions[this.path]) {
        this.exitActions[this.path].call(this, attrs);
      }
      this.pathStack.pop();
      this.path = this.pathStack.slice(1).join('/');
      this.fullPath = this.pathStack.join('/');
      return this.stringBuffer = '';
    };

    ReadXmlPipe.prototype.ontext = function(chars) {
      return this.stringBuffer += chars.replace(/^\s+|\s+$/g, '');
    };

    ReadXmlPipe.prototype.onerror = function(msg) {
      this.emit('error', msg);
      return this.log.error("SAXError " + msg);
    };

    return ReadXmlPipe;

  }