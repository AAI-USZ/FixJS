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
                $('.newcreate').append('<li id="tb_'+$(ui.item).attr('id')+'"><input type="text" id="td_'+$(ui.item).attr('id')+'" value=\"'+$(ui.item).attr('name')+'\"></li>');
                $(ui.item).html($(ui.item).attr('id').replace('t_',''));
                cpdbattpos = cpdbattpos+1;
                $('ul.newcreate > li:nth-child('+cpdbattpos+')').css("color", "white");
                $('ul.newcreate > li:nth-child('+cpdbattpos+')').css("background-color","#696565");
                $('ul.newcreate > li:nth-child('+cpdbattpos+')').css("border-bottom","0");
                $('li#tb_'+$(ui.item).attr('id')).css("background-color", "#696565");
                $('li#tb_'+$(ui.item).attr('id')).css("margin-top", "-5px");
                $('li#tb_'+$(ui.item).attr('id')).css("border-top", "0");
            }
        }