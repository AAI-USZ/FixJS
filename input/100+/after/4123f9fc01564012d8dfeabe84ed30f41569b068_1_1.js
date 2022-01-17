function(event,ui) {
            tokencurrentarray = $(this).sortable('toArray');
            var tattpos = jQuery.inArray($(ui.item).attr('id'),tokencurrentarray);
            var cattpos = tattpos+1;
            var tattid = tokencurrentarray[cattpos-2];
            var cattid = $(ui.item).attr('id');
            if(tattpos == 0 ) {
                alert(mustPairAttributeText);
                $(ui.sender).sortable('cancel');
            }
            else if($("#"+tattid).css('color') == 'white') {
                alert(onlyOneAttributeMappedText);
                $(ui.sender).sortable('cancel');
            }
            else {
                $('ul.tokenatt > li:nth-child('+tattpos+')').css("color","white");
                $('ul.tokenatt > li:nth-child('+tattpos+')').css("border-top","0");
                $('ul.tokenatt > li:nth-child('+cattpos+')').css("color","white");
                $('ul.tokenatt > li:nth-child('+cattpos+')').css("margin-top","-5px");
                $('ul.tokenatt > li:nth-child('+cattpos+')').css("border-top","0");
                $('ul.tokenatt > li:nth-child('+cattpos+')').css("min-height","20px");
                $("#"+cattid).css("background-color","#696565");
                $("#"+tattid).css("background-color","#696565");
            }
        }