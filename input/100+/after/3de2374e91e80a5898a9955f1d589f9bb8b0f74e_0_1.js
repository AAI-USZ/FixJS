function(form, validator){
                //error messages
                rcerrorslink.on();
                var html = " ";
                for(var key in validator.submitted){
                    var label = $('label[for^="'+ key +'"]').not('[generated]');
                    var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                    var fieldName = legend.length ? legend.text() : label.text();
                    html += "<li>" + fieldName + "</li>";
                };
                $("#recordCollegeErrors ul").html(html);
            }