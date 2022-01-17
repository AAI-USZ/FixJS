function(item){
                /* Create leaf scene */
                var scene = new pvc.visual.Scene(rootScene, {group: item.group});

                if(dataPartVar){
                    scene.vars.dataPart = dataPartVar;
                }

                var labelTextLen = pvc.text.getTextLength(item.label, this.font);
                if(labelTextLen > maxLabelTextLen) {
                    maxLabelTextLen = labelTextLen;
                }

                item.labelTextLength = labelTextLen;

                scene.vars.item = item; // TODO: Not A Var...
            }