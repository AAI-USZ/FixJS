function(atom, dimName){
            var dimType = atom.dimension.type;
            if(!dimType.isHidden){
                if(!isMultiDatumGroup || atom.value != null) {
                    var valueLabel = atom.label;
                    if(playingPercentMap && playingPercentMap.has(dimName)) {
                        valueLabel += " (" + calcPercent(atom, dimName) + ")";
                    }
                    
                    addDim(def.html.escape(atom.dimension.type.label), valueLabel);
                }
            }
        }