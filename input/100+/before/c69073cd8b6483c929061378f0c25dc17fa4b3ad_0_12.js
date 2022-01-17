function(){
        var chart = this.chart,
            maxLabelTextLen = 0,

            /* A root scene that contains all datums */
            rootScene  = new pvc.visual.Scene(null, {panel: this, group: chart.data});

        chart.legendGroupsList.forEach(function(legendGroup){
                createLegendGroupScenes.call(this, legendGroup);
            },
            this);

        rootScene.acts.legendItem = {
            maxLabelTextLen: maxLabelTextLen
        };
        
        return rootScene;

        function createLegendGroupScenes(legendGroup){
            var dataPartAct = ('partValue' in legendGroup) ? {
                                value: legendGroup.partValue,
                                label: legendGroup.partLabel
                              } :
                              null;

            legendGroup.items.forEach(function(legendItem){
                /* Create leaf scene */
                var scene = new pvc.visual.Scene(rootScene, {group: legendItem.group});

                if(dataPartAct){
                    scene.acts.dataPart = dataPartAct;
                }

                var labelTextLen = pvc.text.getTextLength(legendItem.label, this.font);
                if(labelTextLen > maxLabelTextLen) {
                    maxLabelTextLen = labelTextLen;
                }

                legendItem.labelTextLength = labelTextLen;

                /* legendItem special role? */
                scene.acts.legendItem = legendItem;
            }, this);
        }
    }