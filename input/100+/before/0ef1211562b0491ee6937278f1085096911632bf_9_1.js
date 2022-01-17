function() {
                var currAttr = $$(this).attr('data-fjs-highlight_error_for');
                //If only one field specified - just remove class
                if (currAttr == $input.attr('name')) {
                    $$(this).removeClass(errorClass);
                    return;
                }
                //Go over the fields and check if other have same error class
                //and it is actually set
                var relatedFields = currAttr.split(',');
                var needClassRemove = true;
                for (var i=0,c=relatedFields.length; i<c; i++) {
                    if (relatedFields[i] == $input.attr('name'))
                        continue;
                    if ($$('*[name="'+relatedFields[i]+'"]').hasClass(errorClass)) {
                        needClassRemove = false;
                        break;
                    }
                }
                if (needClassRemove)
                    $$(this).removeClass(errorClass);
            }