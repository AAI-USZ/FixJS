function(_super) {

    __extends(StructureSpecificCheckPipe, _super);

    StructureSpecificCheckPipe.name = 'StructureSpecificCheckPipe';

    function StructureSpecificCheckPipe(log) {
      this.schemas = {};
      this.structures = {};
      StructureSpecificCheckPipe.__super__.constructor.apply(this, arguments);
    }

    StructureSpecificCheckPipe.prototype.findSchema = function(type) {
      return this.jsvenv.findSchema('urn:sdmxfeeder.infomodel.dsdspecific.' + type);
    };

    StructureSpecificCheckPipe.prototype.write = function(sdmxdata) {
      var _base, _base1;
      switch (sdmxdata.type) {
        case sdmx.CODE_LIST:
          if ((_base = this.structures).codelists == null) {
            _base.codelists = {};
          }
          this.structures.codelists[this.getItemID(sdmxdata.data)] = sdmxdata.data;
          break;
        case sdmx.CONCEPT_SCHEME:
          if ((_base1 = this.structures).conceptSchemes == null) {
            _base1.conceptSchemes = {};
          }
          this.structures.conceptSchemes[this.getItemID(sdmxdata.data)] = sdmxdata.data;
          break;
        case sdmx.DATA_STRUCTURE_DEFINITION:
          this.jsvenv.createSchema(this.convertToSeriesSchema(sdmxdata.data));
      }
      return StructureSpecificCheckPipe.__super__.write.apply(this, arguments);
    };

    StructureSpecificCheckPipe.prototype.getItemID = function(item) {
      return "" + item.agencyID + ":" + item.id + "(" + item.version + ")";
    };

    StructureSpecificCheckPipe.prototype.getItemParentID = function(item) {
      return "" + item.agencyID + ":" + item.maintainableParentID + "(" + item.maintainableParentVersion + ")";
    };

    StructureSpecificCheckPipe.prototype.addEnumeration = function(enumeration, target) {
      var code, codelist, codes;
      if (enumeration == null) {
        return;
      }
      codelist = this.structures.codelists[this.getItemID(enumeration.ref)];
      if (codelist == null) {
        return;
      }
      codes = [];
      for (code in codelist.codes) {
        codes.push(code);
      }
      return target["enum"] = codes;
    };

    StructureSpecificCheckPipe.prototype.addTextFormat = function(format, target) {
      if (format == null) {
        return;
      }
      target.type = (function() {
        switch (format.textType) {
          case 'Numeric':
            return 'number';
          default:
            return 'string';
        }
      })();
      if (format.minLength != null) {
        target.minLength = format.minLength;
      }
      if (format.maxLength != null) {
        return target.maxLength = format.maxLength;
      }
    };

    StructureSpecificCheckPipe.prototype.findConcept = function(ref) {
      var conceptScheme;
      conceptScheme = this.structures.conceptSchemes[this.getItemParentID(ref)];
      return conceptScheme != null ? conceptScheme.concepts[ref != null ? ref.id : void 0] : void 0;
    };

    StructureSpecificCheckPipe.prototype.convertRepresentation = function(comp, target) {
      var concept, _ref, _ref1, _ref2, _ref3, _ref4;
      concept = this.findConcept((_ref = comp.conceptIdentity) != null ? _ref.ref : void 0);
      this.addEnumeration(concept != null ? (_ref1 = concept.coreRepresentation) != null ? _ref1.enumeration : void 0 : void 0, target);
      this.addEnumeration((_ref2 = comp.localRepresentation) != null ? _ref2.enumeration : void 0, target);
      this.addTextFormat(concept != null ? (_ref3 = concept.coreRepresentation) != null ? _ref3.textFormat : void 0 : void 0, target);
      return this.addTextFormat((_ref4 = comp.localRepresentation) != null ? _ref4.textFormat : void 0, target);
    };

    StructureSpecificCheckPipe.prototype.addDimensions = function(schema, dataStructure) {
      var comp, dim, key, _ref, _results;
      _ref = dataStructure.dimensionDescriptor;
      _results = [];
      for (key in _ref) {
        comp = _ref[key];
        if (!(comp.type !== 'timeDimension')) {
          continue;
        }
        dim = {};
        dim.type = 'string';
        dim.required = true;
        this.convertRepresentation(comp, dim);
        _results.push(schema.properties.seriesKey.properties[key] = dim);
      }
      return _results;
    };

    StructureSpecificCheckPipe.prototype.addAttributes = function(schema, dataStructure) {
      var comp, dim, key, _ref, _results;
      _ref = dataStructure.attributeDescriptor;
      _results = [];
      for (key in _ref) {
        comp = _ref[key];
        if (!(comp.attributeRelationship.dimensions != null)) {
          continue;
        }
        dim = {};
        dim.type = 'string';
        if (comp.usageStatus === 'Mandatory') {
          dim.required = true;
        }
        this.convertRepresentation(comp, dim);
        _results.push(schema.properties.attributes.properties[key] = dim);
      }
      return _results;
    };

    StructureSpecificCheckPipe.prototype.addObsAttributes = function(schema, dataStructure) {
      var comp, dim, key, _ref, _results;
      _ref = dataStructure.attributeDescriptor;
      _results = [];
      for (key in _ref) {
        comp = _ref[key];
        if (!(comp.attributeRelationship.primaryMeasure != null)) {
          continue;
        }
        dim = {};
        dim.type = 'array';
        if (comp.usageStatus === 'Mandatory') {
          dim.required = true;
        }
        dim.items = {};
        this.convertRepresentation(comp, dim.items);
        _results.push(schema.properties.obs.properties.attributes.properties[key] = dim);
      }
      return _results;
    };

    StructureSpecificCheckPipe.prototype.convertToSeriesSchema = function(dataStructure, structures) {
      var schema;
      schema = emptySchemaForSeries();
      this.addDimensions(schema, dataStructure);
      this.addAttributes(schema, dataStructure);
      this.addObsAttributes(schema, dataStructure);
      return schema;
    };

    return StructureSpecificCheckPipe;

  }