f
    __extends(WriteJsonPipe, _super);

    WriteJsonPipe.name = 'WriteJsonPipe';

    function WriteJsonPipe() {
      return WriteJsonPipe.__super__.constructor.apply(this, arguments);
    }

    WriteJsonPipe.prototype.before = function(type, data) {
      switch (type) {
        case sdmx.CODE_LIST:
        case sdmx.CONCEPT_SCHEME:
        case sdmx.DATA_STRUCTURE_DEFINITION:
          return "\t\t\t\"" + data.agencyID + ":" + data.id + "(" + data.version + ")\": ";
        default:
          return '';
      }
    };

    WriteJsonPipe.prototype.beforeNext = function(type) {
      switch (type) {
        case sdmx.CODE_LIST:
        case sdmx.CONCEPT_SCHEME:
        case sdmx.DATA_STRUCTURE_DEFINITION:
          return ',\n';
        case sdmx.ATTRIBUTE_GROUP:
        case sdmx.SERIES:
        case sdmx.DATA_SET_ATTRIBUTES:
          return ',\n\t\t\t';
        default:
          return '';
      }
    };

    WriteJsonPipe.prototype.beforeFirst = function(type) {
      var str;
      str = '';
      switch (type) {
        case 'end':
          if (0 < this.counters["in"].datasetheader) {
            str += '\n\t\t]';
          }
          if (0 < this.counters["in"].structure) {
            str += '\n\t}';
          }
          if (0 < this.counters["in"].datasetheader) {
            str += '\n\t]';
          }
          str += '\n]';
          break;
        case sdmx.HEADER:
          str += '[\n\t';
          break;
        case sdmx.CODE_LIST:
        case sdmx.CONCEPT_SCHEME:
        case sdmx.DATA_STRUCTURE_DEFINITION:
          if (this.counters["in"].structure === 1) {
            str += ',\n\t{\n';
          } else {
            str += ',\n';
          }
          switch (type) {
            case sdmx.CODE_LIST:
              str += '\t\t"codelists": {\n';
              break;
            case sdmx.CONCEPT_SCHEME:
              str += '\t\t"concepts": {\n';
              break;
            case sdmx.DATA_STRUCTURE_DEFINITION:
              str += '\t\t"dataStructures": {\n';
          }
          break;
        case sdmx.DATA_SET_HEADER:
          if (this.counters["in"].structure === 0) {
            str += ',\n\t{}';
          }
          str += ',\n\t[\n\t\t';
          break;
        case sdmx.ATTRIBUTE_GROUP:
        case sdmx.SERIES:
        case sdmx.DATA_SET_ATTRIBUTES:
          if (1 < this.counters["in"].data) {
            str += ',\n\t\t\t';
          }
      }
      return str;
    };

    WriteJsonPipe.prototype.stringify = function(type, data) {
      switch (type) {
        case sdmx.HEADER:
          return this.toJSON(data);
        case sdmx.CODE_LIST:
        case sdmx.CONCEPT_SCHEME:
        case sdmx.DATA_STRUCTURE_DEFINITION:
          return this.toJSON(data, true, 3);
        case sdmx.DATA_SET_HEADER:
          return this.toJSON(data, true, 2);
        case sdmx.SERIES:
        case sdmx.ATTRIBUTE_GROUP:
        case sdmx.DATA_SET_ATTRIBUTES:
          return this.toJSON(data, true, 3);
        default:
          return '';
      }
    };

    WriteJsonPipe.prototype.afterLast = function(type) {
      switch (type) {
        case sdmx.CODE_LIST:
        case sdmx.CONCEPT_SCHEME:
        case sdmx.DATA_STRUCTURE_DEFINITION:
          return '\n\t\t}';
        case sdmx.DATA_SET_HEADER:
          return ',\n\t\t[\n\t\t\t';
        default:
          return '';
      }
    };

    WriteJsonPipe.prototype.toJSON = function(data, withBraces, level) {
      var str;
      if (withBraces == null) {
        withBraces = true;
      }
      if (level == null) {
        level = 1;
      }
      if (!(data != null)) {
        return;
      }
      str = JSON.stringify(data, null, '\t');
      if (!withBraces) {
        str = str.slice(2, -2);
      }
      str = str.replace(/\n/g, '\n' + Array(level + 1).join('\t'));
      return str;
    };

    return WriteJsonPipe;

  })(sdmx.WriteSdmxPipe);
