function() {
        var value = Ext.form.DateField.superclass.getValue.call(this);
        var date = this.parseDate(value);
        var bcYear = value.match(this.bcYrRegEx);
        if (bcYear) {
            if(date){
                date = new Date(-1*date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
            }
        }
        return (date) ? date.getTime()/1000 : null;
    }