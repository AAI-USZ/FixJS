function(value) {
                                values_input.val(values_input.val().replace(","+value+",",","));
                                selections_holder.find('li[data-value = "' + value + '"]').remove();
                            }