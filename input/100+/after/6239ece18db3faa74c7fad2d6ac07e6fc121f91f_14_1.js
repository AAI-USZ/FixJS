function(dimName){
                var dim = group.dimensions(dimName);
                if(!dim.type.isHidden){
                    var dimLabel = def.html.escape(dim.type.label),
                        valueLabel;
                    
                    if(dim.type.valueType === Number) {
                        // Sum
                        valueLabel = dim.format(dim.sum(visibleKeyArgs));
                        if(playingPercentMap && playingPercentMap.has(dimName)) {
                            valueLabel += " (" + calcPercent(null, dimName) + ")";
                        }
                        
                        dimLabel = "&sum; " + dimLabel;
                    } else {
                        valueLabel = dim.atoms(visibleKeyArgs).map(function(atom){ return atom.label || "- "; }).join(", ");
                    }
                    
                    addDim(dimLabel, valueLabel);
                }
            }