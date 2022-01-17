function(event) {
            //this.parentComponent.parentComponent.dragLayerID = this.layerID;
            event.dataTransfer.setData('Text', 'Keyframe');

            // Get my index in my track's tween array
            var i = 0,
                tweenRepetitionLength = this.parentComponent.parentComponent.parentComponent.tweenRepetition.childComponents.length,
                myIndex = null;
            for (i = 0; i < tweenRepetitionLength; i++) {
                if (this.parentComponent.parentComponent.parentComponent.tweenRepetition.childComponents[i].uuid === this.parentComponent.uuid) {
                    myIndex = i;
                }
            }
            this.parentComponent.parentComponent.parentComponent.draggingIndex = myIndex;
            this.selectKeyframe();
        }