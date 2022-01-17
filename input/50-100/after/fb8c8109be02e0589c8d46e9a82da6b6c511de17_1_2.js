function(e) {
            if (e.which === 13) {
                dtable.fnFilter( e.target.value );
                dtable.width('100%');
                if (selections.indexOf(e.target.value) === -1) {
                   selections.push(e.target.value);
                }
                input_obj.autocomplete('close');
            }
        }