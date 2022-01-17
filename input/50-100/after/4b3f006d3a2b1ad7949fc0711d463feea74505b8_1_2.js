function() {
            var owner = this.get('owner');
            var selection = owner.get('selection');
            var dataCell = owner.get('selectedDataCell');
            var readOnlyValue = owner.editableValue(dataCell, true);
            selection.html(readOnlyValue);
            selection.addClass('read-only is-selectable');
        }