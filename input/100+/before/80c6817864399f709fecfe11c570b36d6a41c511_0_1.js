function(_super) {

    __extends(CheckPipe, _super);

    CheckPipe.name = 'CheckPipe';

    function CheckPipe(log) {
      this.errors = [];
      this.jsvenv = JSV.createEnvironment('json-schema-draft-03');
      this.loadSchemas();
      this.validationCount = 0;
      CheckPipe.__super__.constructor.call(this, log);
    }

    CheckPipe.prototype.processData = function(sdmxdata) {
      this.assert(sdmxdata.type != null, "data event must have property 'type'");
      this.assert(sdmxdata.data != null, "data event must have property 'data'");
      if ((sdmxdata.data != null) && (sdmxdata.type != null)) {
        this.validate(sdmxdata.data, sdmxdata.type);
      }
      this.checkEventOrder(sdmxdata.type);
      return CheckPipe.__super__.processData.call(this, sdmxdata);
    };

    CheckPipe.prototype.checkEventOrder = function(type) {
      if (this.counters.objects === 0 && type !== sdmx.HEADER) {
        this.errors.push("Header should be the first event");
      }
      switch (type) {
        case sdmx.CODE_LIST:
        case sdmx.CONCEPT_SCHEME:
        case sdmx.DATA_STRUCTURE_DEFINITION:
          if (this.counters.header === 0) {
            this.errors.push('Header should come before structures');
          }
          if (0 < this.counters.data) {
            return this.errors.push('Structures should come before data');
          }
          break;
        case sdmx.DATA_SET_HEADER:
          if (this.counters.header === 0) {
            return this.errors.push('Header should come before data set header');
          }
          break;
        case sdmx.DATA_SET_ATTRIBUTES:
        case sdmx.ATTRIBUTE_GROUP:
        case sdmx.SERIES:
          if (this.counters.datasetheader === 0) {
            this.errors.push('Data set header should come before data');
          }
          if (this.counters.header === 0) {
            return this.errors.push('Header should come before data');
          }
      }
    };

    CheckPipe.prototype.validate = function(data, type) {
      var error, errors, schema, _i, _len;
      schema = this.findSchema(type);
      if (schema != null) {
        errors = schema.validate(data).errors;
        for (_i = 0, _len = errors.length; _i < _len; _i++) {
          error = errors[_i];
          this.errors.push("" + (this.getReadableID(type, data)) + ": " + (error.message + ' ' + error.schemaUri + ' ' + error.attribute + ' ' + error.details));
        }
        return this.validationCount += 1;
      }
    };

    CheckPipe.prototype.getReadableID = function(type, obj) {
      var key, value;
      switch (type) {
        case 'series':
          return type + ' ' + ((function() {
            var _ref, _results;
            _ref = obj.seriesKey;
            _results = [];
            for (key in _ref) {
              value = _ref[key];
              _results.push(value);
            }
            return _results;
          })()).join('.');
        case 'group':
          return type + ' ' + ((function() {
            var _ref, _results;
            _ref = obj.groupKey;
            _results = [];
            for (key in _ref) {
              value = _ref[key];
              _results.push(value);
            }
            return _results;
          })()).join('.');
        default:
          return type + (obj.id != null ? " " + obj.id : '');
      }
    };

    CheckPipe.prototype.findSchema = function(type) {};

    CheckPipe.prototype.loadSchemas = function() {};

    CheckPipe.prototype.assert = function(value, msg, context) {
      if (!value) {
        return this.errors.push("" + msg + " in " + context);
      }
    };

    CheckPipe.prototype.validateSimpleType = function(obj, type, path) {
      switch (type) {
        case 'integer':
          this.assert(typeof obj === 'number', "value should be number but is " + (typeof obj), path);
          if (obj === obj) {
            return this.assert(obj % 1 === 0, "value should be integer but is " + obj, path);
          }
          break;
        case 'array':
          return this.assert(Array.isArray(obj, "value should be array but is " + (typeof obj), path));
        case 'date':
          return this.assert(obj instanceof Date, "value should be date but is " + obj, path);
        case 'null':
          return this.assert(obj === null, "value should be null but is " + obj, path);
        case 'any':
          return this.assert(typeof obj !== 'undefined', 'value must be defined', path);
        default:
          return this.assert(typeof obj === type, "value should be " + type + " but is " + (typeof obj), path);
      }
    };

    CheckPipe.prototype.validateType = function(obj, schema, path) {
      if (schema.type == null) {
        return;
      }
      return this.validateSimpleType(obj, schema.type);
    };

    CheckPipe.prototype.validateEnum = function(obj, schema, path) {
      var item, result;
      if (schema["enum"] == null) {
        return;
      }
      result = (function() {
        var _i, _len, _ref, _results;
        _ref = schema["enum"];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item === obj) {
            _results.push(item);
          }
        }
        return _results;
      })();
      return this.assert(result.length === 1, "value " + obj + " is not in [" + (schema["enum"].join(',')) + "]", path);
    };

    CheckPipe.prototype.validatePattern = function(obj, schema, path) {
      if (schema.pattern == null) {
        return;
      }
      return this.assert(new RegExp(schema.pattern).test(obj), "value " + obj + " does not match pattern " + schema.pattern, path);
    };

    CheckPipe.prototype.validateLength = function(obj, schema, path) {
      if (schema.minLength != null) {
        this.assert(schema.minLength <= obj.length, "value " + obj + " must be longer than " + schema.minLength, path);
      }
      if (schema.maxLength != null) {
        return this.assert(obj.length <= schema.maxLength, "value " + obj + " must be shorter than " + schema.maxLength, path);
      }
    };

    CheckPipe.prototype.validateRequired = function(obj, schema, path) {
      if ((schema.required != null) && schema.required) {
        return this.assert(typeof obj !== 'undefined', "" + path + " is required", path);
      }
    };

    CheckPipe.prototype.validateProperties = function(obj, schema, path) {
      var pattern, property, subschema, value, _ref, _results, _results1;
      if (!((schema.properties != null) || (schema.patternProperties != null))) {
        return;
      }
      this.assert(typeof obj === 'object', "value should be object but is " + (typeof obj), path);
      if (typeof obj !== 'object') {
        return;
      }
      if (schema.properties != null) {
        _ref = schema.properties;
        for (property in _ref) {
          value = _ref[property];
          this.validate(obj[property], value, "" + path + "/" + property);
        }
        if (schema.patternProperties != null) {
          _results = [];
          for (property in obj) {
            value = obj[property];
            if (schema.properties[property]) {
              continue;
            }
            _results.push((function() {
              var _ref1, _results1;
              _ref1 = schema.patternProperties;
              _results1 = [];
              for (pattern in _ref1) {
                subschema = _ref1[pattern];
                if (property.match(pattern)) {
                  _results1.push(this.validate(value, subschema, "" + path + "/" + property));
                } else {
                  _results1.push(void 0);
                }
              }
              return _results1;
            }).call(this));
          }
          return _results;
        }
      } else {
        if (schema.patternProperties != null) {
          _results1 = [];
          for (property in obj) {
            value = obj[property];
            _results1.push((function() {
              var _ref1, _results2;
              _ref1 = schema.patternProperties;
              _results2 = [];
              for (pattern in _ref1) {
                subschema = _ref1[pattern];
                if (property.match(pattern)) {
                  _results2.push(this.validate(value, subschema, "" + path + "/" + property));
                } else {
                  _results2.push(void 0);
                }
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }
      }
    };

    CheckPipe.prototype.validateAdditionalProperties = function(obj, schema, path) {
      var matched, pattern, property, _results, _results1, _results2;
      if (!((schema.additionalProperties != null) && !schema.additionalProperties)) {
        return;
      }
      this.assert(typeof obj === 'object', "value should be object but is " + (typeof obj), path);
      if (typeof obj !== 'object') {
        return;
      }
      if (schema.properties != null) {
        if (schema.patternProperties != null) {
          _results = [];
          for (property in obj) {
            matched = false;
            matched = schema.properties[property];
            if (!matched) {
              for (pattern in schema.patternProperties) {
                if (property.match(pattern)) {
                  matched = true;
                }
              }
            }
            _results.push(this.assert(matched, "property " + property + " is not allowed", path));
          }
          return _results;
        } else {
          _results1 = [];
          for (property in obj) {
            _results1.push(this.assert(schema.properties[property] != null, "property " + property + " is not allowed", path));
          }
          return _results1;
        }
      } else {
        if (schema.patternProperties != null) {
          _results2 = [];
          for (property in obj) {
            matched = false;
            for (pattern in schema.patternProperties) {
              if (property.match(pattern)) {
                matched = true;
              }
            }
            _results2.push(this.assert(matched, "property " + property + " is not allowed", path));
          }
          return _results2;
        }
      }
    };

    CheckPipe.prototype.validateItems = function(obj, schema, path) {
      var item, _i, _len, _results;
      if (schema.items == null) {
        return;
      }
      this.assert(Array.isArray(obj, "" + obj + " is not an Array", path));
      _results = [];
      for (_i = 0, _len = obj.length; _i < _len; _i++) {
        item = obj[_i];
        _results.push(this.validate(item, schema.items, "" + path + "/" + item));
      }
      return _results;
    };

    CheckPipe.prototype.validateUniqueItems = function(obj, schema, path) {
      if (!((schema.uniqueItems != null) && schema.uniqueItems)) {
        return;
      }
      this.assert(Array.isArray(obj, "" + obj + " is not an Array", path));
      return this.assert(obj.length === _.uniq(obj).length, "All items in array " + obj + " must be unique", path);
    };

    CheckPipe.prototype.addDefaultValues = function(obj, schema) {
      var key, _results;
      if (schema.properties == null) {
        return;
      }
      if (typeof obj !== 'object') {
        return;
      }
      _results = [];
      for (key in schema.properties) {
        if (schema.properties[key]["default"] != null) {
          if (obj[key] == null) {
            _results.push(obj[key] = schema.properties[key]["default"]);
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    };

    CheckPipe.prototype.validateOld = function(obj, schema, path) {
      this.validateRequired(obj, schema, path);
      if (typeof obj === 'undefined') {
        return;
      }
      this.validateType(obj, schema, path);
      this.validateEnum(obj, schema, path);
      this.validatePattern(obj, schema, path);
      this.validateLength(obj, schema, path);
      this.validateAdditionalProperties(obj, schema, path);
      this.validateProperties(obj, schema, path);
      this.validateItems(obj, schema, path);
      this.validateUniqueItems(obj, schema, path);
      return this.addDefaultValues(obj, schema);
    };

    CheckPipe.prototype.check = function(data, schemaID, forJSON) {
      var schema;
      if (forJSON == null) {
        forJSON = false;
      }
      schema = this.getSchema(schemaID, forJSON);
      if (schema != null) {
        return this.validate(data, schema, "" + (this.getID(schemaID, data)));
      } else {
        return this.log.debug("No schema for " + schemaID);
      }
    };

    return CheckPipe;

  }