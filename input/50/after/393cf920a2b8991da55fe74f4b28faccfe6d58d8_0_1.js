function() {
        var field = this.down('autocompleteuserwidget');
        console.log('clearandfocus');
        field.clearValue();
        field.focus();
    }