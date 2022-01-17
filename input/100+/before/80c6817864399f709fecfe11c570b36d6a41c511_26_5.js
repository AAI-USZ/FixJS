function(_super) {

    __extends(ConvertCompactPipe, _super);

    ConvertCompactPipe.name = 'ConvertCompactPipe';

    function ConvertCompactPipe(log, registry) {
      this.registry = registry;
      this.doCallbackForFind = __bind(this.doCallbackForFind, this);

      this.state = SETUP;
      this.dsd = {};
      this.convertQueue = [];
      ConvertCompactPipe.__super__.constructor.apply(this, arguments);
    }

    ConvertCompactPipe.prototype.processData = function(sdmxdata) {
      this.log.debug("" + this.constructor.name + " processData");
      switch (this.state) {
        case SETUP:
          if (!this.paused) {
            this.pause();
          }
          this.doSetup(sdmxdata);
          return ConvertCompactPipe.__super__.processData.apply(this, arguments);
        case WAITING_CONVERT:
        case WAITING_PASSTHROUGH:
          this.convertQueue.push(sdmxdata);
          return ConvertCompactPipe.__super__.processData.apply(this, arguments);
        case CONVERT:
          return ConvertCompactPipe.__super__.processData.call(this, this.convert(sdmxdata));
        case PASSTHROUGH:
          return ConvertCompactPipe.__super__.processData.apply(this, arguments);
      }
    };

    ConvertCompactPipe.prototype.doSetup = function(sdmxdata) {
      var ref;
      this.log.debug("" + this.constructor.name + " doSetup");
      switch (sdmxdata.type) {
        case sdmx.HEADER:
          this.header = sdmxdata;
          break;
        case sdmx.DATA_SET_HEADER:
          this.dataSetHeader = sdmxdata;
          this.repairHeaderRefs(this.header.data, this.dataSetHeader.data);
          break;
        case sdmx.DATA_SET_ATTRIBUTES:
        case sdmx.SERIES:
        case sdmx.ATTRIBUTE_GROUP:
          ref = this.header.data.structure[this.dataSetHeader.data.structureRef].structureRef;
          if (sdmxdata.data.components != null) {
            this.state = WAITING_CONVERT;
            if (ref != null) {
              this.registry.query(sdmx.DATA_STRUCTURE_DEFINITION, ref, false, this.doCallbackForFind);
            } else {
              this.registry.match(sdmxdata.type, sdmxdata.data, this.doCallbackForFind);
            }
            this.convertQueue.push(sdmxdata);
          } else {
            this.state = PASSTHROUGH;
            if (!(ref != null)) {
              this.state = WAITING_PASSTHROUGH;
              this.registry.match(sdmxdata.type, sdmxdata.data, this.doCallbackForFind);
              this.convertQueue.push(sdmxdata);
            }
          }
          break;
        default:
          this.state = PASSTHROUGH;
      }
      if (this.state === PASSTHROUGH) {
        return this.resume();
      }
    };

    ConvertCompactPipe.prototype.doCallbackForFind = function(err, result) {
      var sdmxdata, _i, _len, _ref;
      this.log.debug("" + this.constructor.name + " doCallbackForFind");
      if (result == null) {
        throw new Error('Missing Data Structure Definition');
      }
      if (this.state === WAITING_CONVERT) {
        this.state = CONVERT;
      }
      if (this.state === WAITING_PASSTHROUGH) {
        this.state = PASSTHROUGH;
      }
      this.dsd = result;
      this.repairHeaderStructureRef(this.header.data, this.dsd);
      if (this.state === CONVERT) {
        _ref = this.convertQueue;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sdmxdata = _ref[_i];
          this.convert(sdmxdata);
        }
      }
      return this.resume();
    };

    ConvertCompactPipe.prototype.convertSeries = function(sdmxdata) {
      var key, series, value, _ref;
      this.log.debug("" + this.constructor.name + " convertSeries");
      series = sdmxdata.data;
      if (series.components != null) {
        _ref = series.components;
        for (key in _ref) {
          value = _ref[key];
          if (this.dsd.dimensionDescriptor[key] != null) {
            if (series.seriesKey == null) {
              series.seriesKey = {};
            }
            series.seriesKey[key] = value;
          } else if (this.dsd.attributeDescriptor[key] != null) {
            if (series.attributes == null) {
              series.attributes = {};
            }
            series.attributes[key] = value;
          }
        }
        delete series.components;
      }
      return sdmxdata;
    };

    ConvertCompactPipe.prototype.convertGroup = function(sdmxdata) {
      var group, key, value, _ref;
      this.log.debug("" + this.constructor.name + " convertGroup");
      group = sdmxdata.data;
      if (group.components != null) {
        _ref = group.components;
        for (key in _ref) {
          value = _ref[key];
          if (this.dsd.dimensionDescriptor[key] != null) {
            if (group.groupKey == null) {
              group.groupKey = {};
            }
            group.groupKey[key] = value;
          } else if (this.dsd.attributeDescriptor[key] != null) {
            if (group.attributes == null) {
              group.attributes = {};
            }
            group.attributes[key] = value;
          }
        }
        delete group.components;
      }
      return sdmxdata;
    };

    ConvertCompactPipe.prototype.emitHeaders = function() {
      this.log.debug("" + this.constructor.name + " emitHeaders");
      this.emitData(this.header);
      if (this.dataSetHeader != null) {
        return this.emitData(this.dataSetHeader);
      }
    };

    ConvertCompactPipe.prototype.convert = function(sdmxdata) {
      this.log.debug("" + this.constructor.name + " convert");
      switch (sdmxdata.type) {
        case sdmx.ATTRIBUTE_GROUP:
          return this.convertGroup(sdmxdata);
        case sdmx.DATA_SET_ATTRIBUTES:
          return this.convertGroup(sdmxdata);
        case sdmx.SERIES:
          return this.convertSeries(sdmxdata);
        default:
          return sdmxdata;
      }
    };

    ConvertCompactPipe.prototype.repairHeaderRefs = function(header, dataSetHeader) {
      var structure, _base, _name;
      this.log.debug("" + this.constructor.name + " repairHeaderRefs");
      if (header.structure == null) {
        header.structure = {};
      }
      if (dataSetHeader.structureRef != null) {
        if ((_base = header.structure)[_name = dataSetHeader.structureRef] == null) {
          _base[_name] = {
            structureID: dataSetHeader.structureRef
          };
        }
        return;
      }
      if (0 < Object.keys(header.structure).length) {
        dataSetHeader.structureRef = header.structure[Object.keys(header.structure)[0]].structureID;
        return;
      }
      structure = {
        structureID: 'STR1'
      };
      header.structure[structure.structureID] = structure;
      return dataSetHeader.structureRef = structure.structureID;
    };

    ConvertCompactPipe.prototype.repairHeaderStructureRef = function(header, dsd) {
      var structure;
      this.log.debug("" + this.constructor.name + " repairHeaderStructureRef");
      structure = header.structure[Object.keys(header.structure)[0]];
      if (structure.structureRef == null) {
        structure.structureRef = {};
      }
      if (!(structure.structureRef.ref != null)) {
        structure.structureRef.ref = {};
        structure.structureRef.ref.agencyID = dsd.agencyID;
        structure.structureRef.ref.id = dsd.id;
        return structure.structureRef.ref.version = dsd.version;
      }
    };

    return ConvertCompactPipe;

  }