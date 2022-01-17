function(e){
                                var selectedIndex = $(select)[0].selectedIndex;
                                switch(e.keyCode){
                                    case 40: /* Down */
                                        if (selectedIndex < $(select).find('option').length-1){ selectedIndex++; }
                                        break;
                                    case 38: /* Up */
                                        if (selectedIndex > 0){ selectedIndex--; }
                                        break;
                                    case 13: /* Enter */
                                        if (selectListWrapper.is(':visible'))
                                            selectListWrapper.hide();
                                        else {
                                            selectListWrapper.show();
                                            jScrollApi[$(select).attr('name')] = selectListWrapper.jScrollPane().data('jsp');
                                        }    
                                        break;
                                    case 32: /* Space */
                                        if (selectListWrapper.is(':visible'))
                                            selectListWrapper.hide();
                                        else {
                                            selectListWrapper.show();
                                            jScrollApi[$(select).attr('name')] = selectListWrapper.jScrollPane().data('jsp');
                                        }    
                                        break;
                                    case 9: /* Tab */
                                            selectListWrapper.hide();
                                            return true;
                                           
                                    default: /* Key select */
                                        tmpIndex = 0;
                                        for (var key in $(select)[0].options) {
                                            if (typeof $(select)[0].options[key].text == 'string') {
                                                var localString = $(select)[0].options[key].text.toUpperCase();
                                                if (String.fromCharCode(e.keyCode) == localString[0]) {
                                                    selectedIndex = tmpIndex;
                                                }    
                                                tmpIndex++;
                                            }
                                        }
                                        break;
                                        return true;
                                }
                                $(select)[0].selectedIndex = selectedIndex;
                                selectObject.find('li.selected').removeClass('selected');
                                selectObject.find('li:eq('+selectedIndex+')').addClass('selected');
                                selectObject.find('option').removeAttr('selected');
                                selectObject.find('option:eq('+selectedIndex+')').attr('selected','selected');
                                $(select).trigger('change');
                                if (selectListWrapper.is(':visible'))
                                    jScrollApi[$(select).attr('name')].scrollToElement(selectObject.find('li:eq('+selectedIndex+')'));
                                return false;
                            }