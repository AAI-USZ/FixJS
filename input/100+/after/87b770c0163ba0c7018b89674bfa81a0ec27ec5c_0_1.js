function() {
            var selectedStates = this.get('selectedStates').getEach('path');
            var selectedMethods = this.get('selectedMethods').getEach('path');
            var selected = selectedStates.concat(selectedMethods);
            var toBeRestored = this.get('toBeRestored');
            if( window.history.state && window.history.state.selected ) {
                if( compareArrays(selected,window.history.state.selected)) {
                    if(toBeRestored && compareArrays(selected,toBeRestored)){
                        this.set('toBeRestored',null);
                    }
                    console.log('now equal');
                    return;
                }
            }
            var url = document.URL.split('?')[0] + '?selected=' + encodeURIComponent(JSON.stringify(selected));

            if (!toBeRestored) {
                var state = {
                    isRadar: true,
                    selected: selected
                };
                console.log('pushing state',JSON.stringify(state.selected));
                window.history.pushState(state,'',url);
                this.set('restoring',false);
            }
            else if(compareArrays(selected,toBeRestored)){
                this.set('toBeRestored',null);
            }
        }