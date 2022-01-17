function(header, dataSetHeader) {
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
    }