function(sdmxdata) {
      var _base, _base1, _ref, _ref1;
      switch (sdmxdata.type) {
        case sdmx.CODE_LIST:
          if ((_ref = (_base = this.structures).codelists) == null) {
            _base.codelists = {};
          }
          this.structures.codelists[this.getItemID(sdmxdata.data)] = sdmxdata.data;
          break;
        case sdmx.CONCEPT_SCHEME:
          if ((_ref1 = (_base1 = this.structures).conceptSchemes) == null) {
            _base1.conceptSchemes = {};
          }
          this.structures.conceptSchemes[this.getItemID(sdmxdata.data)] = sdmxdata.data;
          break;
        case sdmx.DATA_STRUCTURE_DEFINITION:
          this.jsvenv.createSchema(this.convertToSeriesSchema(sdmxdata.data));
      }
      return StructureSpecificCheckPipe.__super__.write.apply(this, arguments);
    }