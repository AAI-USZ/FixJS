function(header, dsd) {
      var structure, _ref;
      this.log.debug("" + this.constructor.name + " repairHeaderStructureRef");
      structure = header.structure[Object.keys(header.structure)[0]];
      if ((_ref = structure.structureRef) == null) {
        structure.structureRef = {};
      }
      if (!(structure.structureRef.ref != null)) {
        structure.structureRef.ref = {};
        structure.structureRef.ref.agencyID = dsd.agencyID;
        structure.structureRef.ref.id = dsd.id;
        return structure.structureRef.ref.version = dsd.version;
      }
    }