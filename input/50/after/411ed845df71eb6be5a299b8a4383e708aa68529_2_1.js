function(title, resulttype) {            
            if (typeof(optionInfo[resulttype + '_only']) != 'undefined') {
                $row.addClass(resulttype + '_only');
            }
        }