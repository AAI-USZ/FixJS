function(){
        // Map: Dimension Group -> Item cross-groups indexes
        if(this.measuresDirection === 'rows') {
            throw def.error.notImplemented();
        }

        var me = this,
            index = 0;
        
        function add(dimGroupName, crossGroup, level, count) {
            var crossEndIndex = me._itemCrossGroupIndex[crossGroup] + count; // exclusive
            
            while(count > 0) {
                var dimName = pvc.data.DimensionType.dimensionGroupLevelName(dimGroupName, level);
                if(!me._userUsedDims[dimName]) { // Skip name if occupied and continue with next name
                    
                    // use first available slot for auto dims readers as long as within crossIndex and crossIndex + count
                    index = me._nextAvailableItemIndex(index);
                    if(index >= crossEndIndex) {
                        // this group has no more slots available
                        return;
                    }
                    
                    // Consume the index
                    me._userItem[index] = true;
                    
                    var reader = me._propGet(dimName, index);
                    
                    me._userDimsReaders.push(reader);
                    
                    // <Debug>
                    /*jshint expr:true */
                    !def.hasOwn(me._userDimsReadersByDim, dimName) || def.assert("Dimension already being read.");
                    // </Debug>
                    
                    me._userDimsReadersByDim[dimName] = reader;
                    
                    count--;
                }
                
                level++;
            }
        }
        
        if(this.C > 0){
            add('series', 'C', 0, this.C);
        }
        
        if(this.R > 0){
            add('category', 'R', 0, this.R);
        }
        
        if(!this._userUsedDims.value) {
            add('value', 'M', 0, this.M);
        }

        if(this._axis2SeriesKeySet){
            var seriesReader = this._userDimsReadersByDim.series;
            if(seriesReader) {
                var calcAxis2SeriesKeySet = def.constant(this._axis2SeriesKeySet);

                /* Create a reader that surely only returns 'series' atoms */
                seriesReader = this._filterDimensionReader(seriesReader, 'series');

                this._dataPartGet(calcAxis2SeriesKeySet, seriesReader);
                
                this._userDimsReaders.push(
                    this._value1AndValue2Get(calcAxis2SeriesKeySet, seriesReader, index));
            }
        }
    }