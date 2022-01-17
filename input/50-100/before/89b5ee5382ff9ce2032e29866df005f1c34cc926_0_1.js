function(event){
                                var value = $(this).data('value');
                                selectList.find('li.active').removeClass('active');
                                $(this).addClass('active');
                                $(select).find('option').removeAttr('selected');
                                $(select).find('option[value='+value+']').attr('selected','selected');
                                $(select).trigger('change');
                                selectListWrapper.hide();
                                return false;
                            }