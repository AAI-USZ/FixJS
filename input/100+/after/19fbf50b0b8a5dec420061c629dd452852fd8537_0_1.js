function(form) {
       form.find('.jsAfter').each(function() {
            var val = $(this).val();

            if(utilities.isNull(val)) {
                return;
            }

            var delim1 = val.indexOf("/");
            var delim2 = val.lastIndexOf("/");
            var day = parseInt(val.substring(0, delim1), 10);
            var month = parseInt(val.substring(delim1 + 1, delim2), 10);
            var year = parseInt(val.substring(delim2 + 1), 10);
            var givenDate = new Date();
            givenDate.setFullYear(year, month - 1, day);
            var valid = true;
            if(isNaN(givenDate.getDate()) || givenDate < new Date()) {
                valid = false;
            }

            if(!valid) {
                $("#" + this.name + "DateError").removeClass('hide');
            }
       });
    }