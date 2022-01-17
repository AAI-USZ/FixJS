function(dimReaderSpec){
        /*jshint expr:true */
        dimReaderSpec || def.fail.argumentRequired('readerSpec');

        var dimNames =  dimReaderSpec.names;
        if(typeof dimNames === 'string'){
            dimNames = dimNames.split(/\s*\,\s*/);
        } else {
            dimNames =  def.array(dimNames);
        }
        
        var hasDims = !!(dimNames && dimNames.length);
        
        if(hasDims){
            dimNames.forEach(function(name){
                name || def.fail.argumentRequired('readers[i].names');
    
                name = name.replace(/^\s*(.+?)\s*$/, "$1"); // trim
    
                !def.hasOwn(this._userUsedDims, name) || def.fail.argumentInvalid('readers[i].names', "Dimension name '{0}' is already being read.", [name]);
                this._userUsedDims[name] = true;
                this.ensureDimensionType(name);
            }, this);
        }
        
        // Consumed/Reserved virtual item indexes
        var indexes = def.array(dimReaderSpec.indexes);
        if(indexes) {
            indexes.forEach(this._userUseIndex, this);
        }

        var reader = dimReaderSpec.reader;
        if(!reader) {
            if(hasDims){
                this._userCreateReaders(dimNames, indexes);
            } // else a reader that only serves to exlude indexes
        } else {
            hasDims || def.fail.argumentRequired('reader.names', "Required argument when a reader function is specified.");
            
            this._userRead(this._wrapReader(reader, dimNames), dimNames);
        }
    }