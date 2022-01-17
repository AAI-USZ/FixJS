f            enumerationValue = $(event.target);
            //enumerationOther = enumerationValue.next(".enumeration-other");
            enumerationOther = enumerationValue.siblings(".enumeration-other:first");
            if (enumerationValue.attr("multiple")=="multiple") {
                multipleValues = enumerationValue.val();
                // TODO: CHECK THE INDEXOF FN IN IE
                //if (! multipleValues || multipleValues.indexOf("OTHER")==-1) {
                if (multipleValues.indexOf("OTHER")==-1) {
                    enumerationOther.hide();
                }
                else {
                    enumerationOther.show();
                }
                
                /* if NONE is selected, then all other choices should be de-selected */
                if ( multipleValues && multipleValues.indexOf("NONE") != -1) {
                    enumerationValue.val("NONE")
                    enumerationOther.hide();
                }


            }
            else {
                if (enumerationValue.val()=="OTHER") {
                    enumerationOther.show();
                }
                else {
                    enumerationOther.hide();
                }
            }
            
            // position the "other" textbox relative to the "value" select            
            $(enumerationOther).offset({
                "left" : $(enumerationValue).offset().left
            });
        });
