function(reader, dimNames){
        /*jshint expr:true */
        def.isFun(reader) || def.fail.argumentInvalid('reader', "Reader must be a function.");
        
        if(def.isArray(dimNames)){
            dimNames.forEach(function(name){
                this._userDimsReadersByDim[name] = reader;
            }, this);
        } else {
            this._userDimsReadersByDim[dimNames] = reader;
        }

        this._userDimsReaders.push(reader);
    }