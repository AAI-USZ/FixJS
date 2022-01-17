function(event,ui) {
            newcurrentarray = $(this).sortable('toArray');
            var cpdbattpos = jQuery.inArray($(ui.item).attr('id'),newcurrentarray)
            var size = $(".newcreate li").size();
            if(cpdbattpos == 0 && size>1) {
                alert(addElementBelowText);
                $(ui.sender).sortable('cancel');
            } else if(newcurrentarray[cpdbattpos+1]=='tb') {
                alert(onlyOneAttributeMappedText);
                $(ui.sender).sortable('cancel');
            } else {
                $('.newcreate').append('<li id="tb"><input type="text" id="td_'+$(ui.item).attr('id')+'" value=\"'+$(ui.item).attr('name')+'\"></li>');
                cpdbattpos = cpdbattpos+1;
                $('ul.newcreate > li:nth-child('+cpdbattpos+')').css("color", "white");
                $('ul.newcreate > li:nth-child('+cpdbattpos+')').css("background-color","#696565");
            }
        }