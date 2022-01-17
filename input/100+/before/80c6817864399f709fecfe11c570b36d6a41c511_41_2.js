function(_super) {

    __extends(WriteXmlPipe, _super);

    WriteXmlPipe.name = 'WriteXmlPipe';

    function WriteXmlPipe(log) {
      this.header = {};
      this.rootElemName = '';
      this.doc = builder.create();
      WriteXmlPipe.__super__.constructor.apply(this, arguments);
    }

    WriteXmlPipe.prototype.before = function(type, data) {
      var str;
      str = '';
      switch (type) {
        case 'header':
          this.header = data;
      }
      return str;
    };

    WriteXmlPipe.prototype.beforeFirst = function(type) {
      var str;
      str = '';
      switch (type) {
        case sdmx.CODE_LIST:
        case sdmx.CONCEPT_SCHEME:
        case sdmx.DATA_STRUCTURE_DEFINITION:
          if (this.counters["in"].structure === 1) {
            this.rootElemName = 'Structure';
            str += stringifiers.document.v2_1(this.doc, this.rootElemName, this.header);
            str += '<message:Structures xmlns="http://www.sdmx.org/resources/sdmxml/schemas/v2_1/structure">\n';
          }
          switch (type) {
            case sdmx.CODE_LIST:
              str += '<Codelists>\n';
              break;
            case sdmx.CONCEPT_SCHEME:
              str += '<Concepts>\n';
              break;
            case sdmx.DATA_STRUCTURE_DEFINITION:
              str += '<DataStructures>\n';
          }
          break;
        case sdmx.DATA_SET_HEADER:
          this.rootElemName = 'GenericTimeSeriesData';
          str += stringifiers.document.v2_1(this.doc, this.rootElemName, this.header);
          break;
        case 'end':
          if (0 < this.counters["in"].datasetheader) {
            str += '</message:DataSet>\n';
          }
          if (0 < this.counters["in"].structure) {
            str += '</message:Structures>\n';
          }
          str += "</" + this.rootElemName + ">";
      }
      return str;
    };

    WriteXmlPipe.prototype.stringify = function(type, data) {
      switch (type) {
        case sdmx.CODE_LIST:
          return stringifiers.codelist.v2_1(this.doc, data);
        case sdmx.CONCEPT_SCHEME:
          return stringifiers.conceptScheme.v2_1(this.doc, data);
        case sdmx.DATA_STRUCTURE_DEFINITION:
          return stringifiers.dataStructureDefinition.v2_1(this.doc, data);
        case sdmx.DATA_SET_HEADER:
          return stringifiers.dataset.genericTimeSeriesData.v2_1(this.doc, data);
        case sdmx.SERIES:
          return stringifiers.series.genericTimeSeriesData.v2_1(this.doc, data);
        case sdmx.ATTRIBUTE_GROUP:
          return stringifiers.group.genericTimeSeriesData.v2_1(this.doc, data);
        case sdmx.DATA_SET_ATTRIBUTES:
          return '';
        default:
          return '';
      }
    };

    WriteXmlPipe.prototype.afterLast = function(type) {
      switch (type) {
        case sdmx.CODE_LIST:
          return '</Codelists>\n';
        case sdmx.CONCEPT_SCHEME:
          return '</Concepts>\n';
        case sdmx.DATA_STRUCTURE_DEFINITION:
          return '</DataStructures>\n';
        default:
          return '';
      }
    };

    return WriteXmlPipe;

  }