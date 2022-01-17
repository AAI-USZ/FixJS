function($parent, optionInfo, optionName) {
        optionInfo['title'] = optionInfo['title'] || "[" + optionName + "]";
        optionInfo['alt']   = optionInfo['alt']   || "";

        var altamount = typeof(optionInfo['alternative']) == 'object' ? optionInfo['alternative'][0] : optionInfo['alternative'];
        
        var $row, $col1, $col2, $col3, $col4, $input, $alt;
        $row = $('<tr />')
                .addClass(optionName + "_alt_ehp")
                .appendTo($parent);
        $col1 = $('<th />')
                .html("+"+altamount+" "+optionInfo['title']+"<br />")
                .attr('title', optionInfo['alt'])
                .appendTo($row);
        $col2 = $('<td />')
                .appendTo($row);
        $col3 = $('<td />')
                .appendTo($row);
        $col4 = $('<td />')
                .appendTo($row);

        _.each(alttypes, function(title, resulttype) {            
            if (typeof(optionInfo[resulttype + '_only']) != 'undefined') {
                $row.addClass(resulttype + '_only');
            }
        }, this);

        $('<span />').addClass('statweight_ehp').appendTo($col2);
        $('<span />').addClass('statweight_viteq').appendTo($col3);
        $('<span />').addClass('statweight_percentage').appendTo($col4);
        
    
    }