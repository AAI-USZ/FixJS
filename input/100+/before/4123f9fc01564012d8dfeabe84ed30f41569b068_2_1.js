function(event,ui) {
            tokencurrentarray = $(this).sortable('toArray');
            var tattpos = jQuery.inArray($(ui.item).attr('id'),tokencurrentarray);
            var cattpos = tattpos+1;
            var tattid = tokencurrentarray[cattpos-2];
            var cattid = $(ui.item).attr('id');
            if(tattpos == 0 ) {
                alert(mustPairAttributeText);
                $(ui.sender).sortable('cancel');
            } else if($("#"+tattid).css('color') == 'rgb(204, 204, 204)') {
                alert(onlyOneAttributeMappedText);
                $(ui.sender).sortable('cancel');
            } else {
                $('ul.centralatt > li:nth-child('+tattpos+')').css("color","white");
                $('ul.centralatt > li:nth-child('+cattpos+')').css("color","white");
                $("#"+cattid).css("background-color","#696565");
                $("#"+tattid).css("background-color","#696565");
            }
        }