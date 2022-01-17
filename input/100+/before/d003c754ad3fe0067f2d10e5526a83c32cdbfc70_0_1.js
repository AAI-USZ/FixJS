function() {
            enumerationValue = $(this);
            //enumerationOther = enumerationValue.next(".enumeration-other");
            enumerationOther = enumerationValue.siblings(".enumeration-other:first");
            // I AM HERE
            enumerationOther.before("<br/>");
            enumerationOther.show(); // show temporarily so that there is a position for offset to work off of
            enumerationOther.offset({
                left : enumerationValue.offset().left
            });
            if (enumerationValue.attr("multiple")=="multiple") {
                multipleValues = enumerationValue.val();
                // TODO: CHECK THE INDEXOF FN IN IE                
                if (! multipleValues || multipleValues.indexOf("OTHER")==-1) {
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
        }