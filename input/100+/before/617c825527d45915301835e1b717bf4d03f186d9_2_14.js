function(){
        var partValues = this._partValues() || [null],
            me = this;
        
        var isOn, onClick;
        
        switch(this.options.legendClickMode){
            case 'toggleSelected':
                if(!this.options.selectable){
                    isOn = def.constant(true);
                } else {
                    isOn = function(){
                        return !this.group.owner.selectedCount() || 
                               this.group.datums(null, {selected: true}).any();
                    };
                    
                    onClick = function(){
                        var on = this.group.datums(null, {selected: true}).any();
                        if(pvc.data.Data.setSelected(this.group.datums(), !on)){
                            me.updateSelections();
                        }
                    };
                }
                break;
                
            default: 
           // 'toggleVisible'
                isOn = function(){
                    return this.group.datums(null, {visible: true}).any();
                };
                
                onClick = function(){
                    if(pvc.data.Data.toggleVisible(this.group.datums())){
                        // Re-render chart
                        me.render(true, true, false);
                    }
                };
                break;
        }
        
        partValues.forEach(function(partValue){
            var partData = this._legendData(partValue);
            if(partData){
                var partColorScale = this._legendColorScale(partValue),
                    partShape = (!partValue || partValue === '0' ? 'square' : 'bar'),
                    legendGroup = {
                        id:        "part" + partValue,
                        type:      "discreteColorAndShape",
                        partValue: partValue,
                        partLabel: partData.label,
                        group:     partData,
                        items:     []
                    },
                    legendItems = legendGroup.items;
            
                partData
                    .children()
                    .each(function(itemData){
                        legendItems.push({
                            value:    itemData.value,
                            label:    itemData.label,
                            group:    itemData,
                            color:    partColorScale(itemData.value),
                            useRule:  undefined,
                            shape:    partShape,
                            isOn:     isOn,
                            click:    onClick
                        });
                    }, this);

                this._addLegendGroup(legendGroup);
            }
        }, this);
    }