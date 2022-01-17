function() {
            var selectedStates = this.get('selectedStates').getEach('path');
            var selectedMethods = this.get('selectedMethods').getEach('path');
            var selected = selectedStates.concat(selectedMethods);
            if (selected.length == 0 || (window.history.state && window.history.state.selected && compareArrays(selected,window.history.state.selected)) ) {
                return;
            }
            var url = document.URL.split('?')[0] + '?selected=' + encodeURIComponent(JSON.stringify(selected));
            if (!this.get('restoring')) {
                var state = {
                    isRadar: true,
                    selected: selected
                };
//                console.log('pushing state',JSON.stringify(state.selected));
                window.history.pushState(state,'',url);            
            }
        }