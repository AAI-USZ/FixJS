function(_super) {

    __extends(ReadPcAxisPipe, _super);

    ReadPcAxisPipe.name = 'ReadPcAxisPipe';

    function ReadPcAxisPipe(log) {
      this.onDataValue = __bind(this.onDataValue, this);

      this.onData = __bind(this.onData, this);

      this.onKeyword = __bind(this.onKeyword, this);
      this.parser = new PcAxisParser(log);
      this.parser.onKeyword = this.onKeyword;
      this.parser.onData = this.onData;
      this.parser.onDataValue = this.onDataValue;
      this.keywords = {};
      this.variables = {};
      this.dimensions = [];
      this.obsDimension = {};
      this.dataSetId = '';
      this.agencyId = '';
      this.lang = 'en';
      this.dataCount = 0;
      ReadPcAxisPipe.__super__.constructor.apply(this, arguments);
    }

    ReadPcAxisPipe.prototype.processData = function(data) {
      return this.parser.parse(data);
    };

    ReadPcAxisPipe.prototype.processEnd = function() {
      return this.parser.end();
    };

    ReadPcAxisPipe.prototype.onKeyword = function(keyword) {
      var _base, _base1, _base2, _name, _name1, _name2;
      this.log.debug("" + this.constructor.name + " onKeyword");
      if (PCAXIS_KEYWORDS[keyword.name] == null) {
        throw new Error("Invalid keyword " + keyword.name);
      }
      if (keyword.name === 'LANGUAGE') {
        this.lang = keyword.value;
      }
      if (PCAXIS_KEYWORDS[keyword.name][LANGUAGE]) {
        if (keyword.language == null) {
          keyword.language = this.lang;
        }
      }
      if ((_base = this.keywords)[_name = keyword.name] == null) {
        _base[_name] = [];
      }
      this.keywords[keyword.name].push(keyword);
      if (keyword.variable != null) {
        if ((_base1 = this.variables)[_name1 = keyword.variable] == null) {
          _base1[_name1] = {};
        }
        if ((_base2 = this.variables[keyword.variable])[_name2 = keyword.name] == null) {
          _base2[_name2] = [];
        }
        this.variables[keyword.variable][keyword.name].push(keyword);
      }
      if (keyword.name === 'MATRIX') {
        this.dataSetId = keyword.value.toUpperCase();
      }
      if (keyword.name === 'SOURCE') {
        return this.agencyId = keyword.value.toUpperCase();
      }
    };

    ReadPcAxisPipe.prototype.onData = function() {
      this.log.debug("" + this.constructor.name + " onData");
      this.checkKeywords();
      this.establishDimensions();
      this.emitHeader();
      this.emitCodelists();
      this.emitConceptScheme();
      this.emitDataStructureDefinition();
      this.emitDatasetHeader();
      return this.parser.dataArrayMaxLength = this.dimensions[this.dimensions.length - 1].codelist.codes.length;
    };

    ReadPcAxisPipe.prototype.onDataValue = function(data) {
      var dim, i, index, key, obsDimension, obsDimensionCodes, obsStatus, obsValue, series, value, _i, _j, _len, _len1, _ref;
      obsDimensionCodes = this.dimensions[this.dimensions.length - 1].codelist.codes;
      obsDimension = [];
      obsValue = [];
      obsStatus = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        value = data[i];
        if (value === '.') {
          continue;
        }
        obsDimension.push(obsDimensionCodes[i]);
        obsValue.push(value === '..' || value === '...' ? NaN : value);
        obsStatus.push(value === '..' || value === '...' ? 'M' : 'A');
      }
      key = {};
      _ref = this.dimensions;
      for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
        dim = _ref[i];
        if (!(i < this.dimensions.length - 1)) {
          continue;
        }
        index = Math.floor(this.dataCount / dim.step) % dim.codelist.codes.length;
        key[dim.concept.id] = dim.codelist.codes[index];
      }
      series = {
        seriesKey: key,
        attributes: {},
        obs: {
          obsDimension: obsDimension,
          obsValue: obsValue,
          attributes: {
            OBS_STATUS: obsStatus
          }
        }
      };
      this.dataCount += 1;
      return this.emitSDMX(sdmx.SERIES, series);
    };

    ReadPcAxisPipe.prototype.findKeywordValue = function() {
      var key, keywords, _i, _len;
      keywords = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = keywords.length; _i < _len; _i++) {
        key = keywords[_i];
        if (this.keywords[key] != null) {
          return this.keywords[key][0].value;
        }
      }
      return;
    };

    ReadPcAxisPipe.prototype.checkKeywords = function() {
      var key, value, _i, _len, _results;
      this.log.debug("" + this.constructor.name + " checkKeywords");
      _results = [];
      for (value = _i = 0, _len = PCAXIS_KEYWORDS.length; _i < _len; value = ++_i) {
        key = PCAXIS_KEYWORDS[value];
        if (value[MANDATORY] && !(this.keywords[key] != null)) {
          throw new Error("Mandatory keyword " + key + " missing.");
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ReadPcAxisPipe.prototype.establishDimensions = function() {
      var dim, heading, i, names, previousCodesLength, previousStep, stub, timeVal, timeVarFound, toArray, toId, value, varKeywords, varName, vars, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _results;
      toArray = function(value) {
        if (Array.isArray(value)) {
          return value;
        } else {
          return [value];
        }
      };
      toId = function(name) {
        return name.toUpperCase().replace(/\s/g, '_');
      };
      vars = [];
      stub = toArray(this.keywords['STUB'][0].value);
      for (_i = 0, _len = stub.length; _i < _len; _i++) {
        value = stub[_i];
        vars.push(value);
      }
      heading = toArray(this.keywords['HEADING'][0].value);
      for (_j = 0, _len1 = heading.length; _j < _len1; _j++) {
        value = heading[_j];
        vars.push(value);
      }
      timeVarFound = false;
      for (i = _k = 0, _len2 = vars.length; _k < _len2; i = ++_k) {
        varName = vars[i];
        varKeywords = this.variables[varName];
        dim = {
          variable: varName,
          concept: {
            id: toId(varName),
            agencyID: this.agencyId,
            parentID: 'CONCEPT_SCHEME'
          },
          codelist: {
            id: 'CL_' + toId(varName),
            agencyID: this.agencyId,
            codes: toArray(varKeywords['CODES'][0].value),
            codeNames: []
          }
        };
        _ref = varKeywords['VALUES'];
        for (_l = 0, _len3 = _ref.length; _l < _len3; _l++) {
          names = _ref[_l];
          dim.codelist.codeNames.push(names);
        }
        if (varKeywords['TIMEVAL'] != null) {
          timeVarFound = true;
          dim.concept.id = 'TIME_PERIOD';
          dim.concept.agencyID = 'SDMX';
          dim.concept.parentID = 'CROSS_DOMAIN_CONCEPTS';
          timeVal = varKeywords['TIMEVAL'][0].value;
          if (Array.isArray(timeVal)) {
            this.frequency = timeVal[0].args[0].slice(0, 1);
          } else {
            this.frequency = timeVal.args[0].slice(0, 1);
          }
          this.dimensions.unshift({
            concept: {
              id: 'FREQ',
              agencyID: 'SDMX',
              parentID: 'CROSS_DOMAIN_CONCEPTS'
            },
            codelist: {
              id: 'CL_FREQ',
              agencyID: 'SDMX',
              codes: [this.frequency],
              codeNames: []
            }
          });
        }
        this.dimensions.push(dim);
      }
      if (!timeVarFound) {
        this.searchForTimeVariable();
      }
      i = this.dimensions.length - 1;
      this.dimensions[i].step = 1;
      this.dimensions[--i].step = previousStep = 1;
      previousCodesLength = this.dimensions[i].codelist.codes.length;
      _results = [];
      while (dim = this.dimensions[--i]) {
        dim.step = previousCodesLength * previousStep;
        previousCodesLength = dim.codelist.codes.length;
        _results.push(previousStep = dim.step);
      }
      return _results;
    };

    ReadPcAxisPipe.prototype.searchForTimeVariable = function() {
      var dim, _i, _len, _ref, _results;
      _ref = this.dimensions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dim = _ref[_i];
        if (dim.concept.id === 'TIME') {
          dim.concept.id = 'TIME_PERIOD';
          dim.concept.agencyID = 'SDMX';
          dim.concept.parentID = 'CROSS_DOMAIN_CONCEPTS';
          switch (dim.codelist.codes[0].length) {
            case 4:
              this.frequency = cdcl.CL_FREQ.codes.A.id;
          }
          this.dimensions.unshift({
            concept: {
              id: 'FREQ',
              agencyID: 'SDMX',
              parentID: 'CROSS_DOMAIN_CONCEPTS'
            },
            codelist: {
              id: 'CL_FREQ',
              agencyID: 'SDMX',
              codes: [this.frequency]
            }
          });
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ReadPcAxisPipe.prototype.emitHeader = function() {
      var contact, header, keyword, sender, source, structure, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      this.log.debug("" + this.constructor.name + " emitHeader");
      contact = {};
      contact.name = {
        en: 'Contact'
      };
      contact.email = parseContact(this.keywords['CONTACT'][0].value);
      sender = {};
      sender.id = this.agencyId;
      sender.name = {};
      _ref = this.keywords['SOURCE'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        keyword = _ref[_i];
        sender.name[keyword.language] = keyword.value;
      }
      sender.contact = [];
      sender.contact.push(contact);
      structure = {};
      structure.structureID = this.dataSetId;
      structure.structureRef = {};
      structure.structureRef.ref = {};
      structure.structureRef.ref.id = structure.structureID;
      structure.structureRef.ref.agencyID = sender.id;
      structure.structureRef.ref.version = '1.0';
      structure.dimensionAtObservation = this.dimensions[this.dimensions.length - 1].concept.id;
      header = {};
      header.id = this.dataSetId;
      header.test = false;
      header.prepared = parsePcAxisDate(this.findKeywordValue('CREATION-DATE', 'LAST-UPDATED'));
      header.sender = {};
      header.sender[sender.id] = sender;
      header.extracted = parsePcAxisDate(this.keywords['LAST-UPDATED'][0].value);
      header.source = {};
      _ref1 = this.keywords['SOURCE'];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        source = _ref1[_j];
        header.source[source.language] = source.value;
      }
      header.structure = {};
      header.structure[structure.structureID] = structure;
      header.name = {};
      _ref2 = this.keywords['TITLE'];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        keyword = _ref2[_k];
        header.name[keyword.language] = keyword.value;
      }
      return this.emitSDMX(sdmx.HEADER, header);
    };

    ReadPcAxisPipe.prototype.emitCodelists = function() {
      var code, codeValue, codelist, dim, i, names, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      _ref = this.dimensions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dim = _ref[_i];
        if (!(dim.codelist.agencyID !== 'SDMX')) {
          continue;
        }
        codelist = {
          id: dim.codelist.id,
          agencyID: dim.codelist.agencyID,
          version: '1.0',
          codes: {},
          name: {}
        };
        _ref1 = dim.codelist.codes;
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          codeValue = _ref1[i];
          code = {
            id: codeValue,
            name: {}
          };
          _ref2 = dim.codelist.codeNames;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            names = _ref2[_k];
            code.name[names.language] = names.value[i];
          }
          codelist.codes[code.id] = code;
        }
        codelist.name[this.lang] = dim.variable;
        this.emitSDMX(sdmx.CODE_LIST, codelist);
      }
      this.emitSDMX(sdmx.CODE_LIST, cdcl.CL_FREQ);
      return this.emitSDMX(sdmx.CODE_LIST, cdcl.CL_OBS_STATUS);
    };

    ReadPcAxisPipe.prototype.emitConceptScheme = function() {
      var concept, conceptScheme, dim, domain, _i, _j, _len, _len1, _ref, _ref1;
      conceptScheme = {
        id: 'CONCEPT_SCHEME',
        agencyID: this.agencyId,
        version: '1.0',
        concepts: {},
        name: {}
      };
      _ref = this.keywords['CONTENTS'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        domain = _ref[_i];
        conceptScheme.name[domain.language] = domain.value;
      }
      _ref1 = this.dimensions;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        dim = _ref1[_j];
        if (!(dim.concept.agencyID !== 'SDMX')) {
          continue;
        }
        concept = {
          id: dim.concept.id,
          name: {}
        };
        concept.name[this.lang] = dim.variable;
        conceptScheme.concepts[concept.id] = concept;
      }
      this.emitSDMX(sdmx.CONCEPT_SCHEME, conceptScheme);
      return this.emitSDMX(sdmx.CONCEPT_SCHEME, cdc.CROSS_DOMAIN_CONCEPTS);
    };

    ReadPcAxisPipe.prototype.emitDataStructureDefinition = function() {
      var dim, dimension, domain, dsd, i, _i, _j, _len, _len1, _ref, _ref1;
      dsd = {
        id: this.dataSetId,
        agencyID: this.agencyId,
        version: '1.0',
        name: {},
        dimensionDescriptor: {},
        measureDescriptor: {},
        attributeDescriptor: {}
      };
      _ref = this.keywords['CONTENTS'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        domain = _ref[_i];
        dsd.name[domain.language] = domain.value;
      }
      i = 1;
      _ref1 = this.dimensions;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        dim = _ref1[_j];
        dimension = {
          id: dim.concept.id,
          order: i,
          conceptIdentity: {
            ref: {
              id: dim.concept.id,
              agencyID: dim.concept.agencyID,
              maintainableParentID: dim.concept.parentID,
              maintainableParentVersion: '1.0'
            }
          }
        };
        if (dim.concept.id === 'TIME_PERIOD') {
          dimension.type = 'timeDimension';
          dimension.localRepresentation = {
            textFormat: {
              textType: 'ObservationalTimePeriod'
            }
          };
        } else {
          dimension.type = 'dimension';
          dimension.localRepresentation = {
            enumeration: {
              ref: {
                id: dim.codelist.id,
                agencyID: dim.codelist.agencyID,
                version: '1.0'
              }
            }
          };
        }
        dsd.dimensionDescriptor[dimension.id] = dimension;
        i += 1;
      }
      dsd.measureDescriptor.primaryMeasure = {
        id: 'OBS_VALUE',
        conceptIdentity: {
          ref: {
            id: 'OBS_VALUE',
            agencyID: 'SDMX',
            maintainableParentID: 'CROSS_DOMAIN_CONCEPTS',
            maintainableParentVersion: '1.0'
          }
        }
      };
      dsd.attributeDescriptor['OBS_STATUS'] = {
        id: 'OBS_STATUS',
        assignmentStatus: 'Mandatory',
        conceptIdentity: {
          ref: {
            id: 'OBS_STATUS',
            agencyID: 'SDMX',
            maintainableParentID: 'CROSS_DOMAIN_CONCEPTS',
            maintainableParentVersion: '1.0'
          }
        },
        attributeRelationship: {
          primaryMeasure: 'OBS_VALUE'
        },
        localRepresentation: {
          enumeration: {
            ref: {
              id: 'CL_OBS_STATUS',
              agencyID: 'SDMX',
              version: '1.0'
            }
          }
        }
      };
      return this.emitSDMX(sdmx.DATA_STRUCTURE_DEFINITION, dsd);
    };

    ReadPcAxisPipe.prototype.emitDatasetHeader = function() {
      var header;
      header = {
        structureRef: this.dataSetId
      };
      return this.emitSDMX(sdmx.DATA_SET_HEADER, header);
    };

    return ReadPcAxisPipe;

  }