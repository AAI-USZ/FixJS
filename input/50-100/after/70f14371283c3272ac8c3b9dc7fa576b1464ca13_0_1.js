function (index, value) {
        if($(value).attr('redirect-url') != null)
         $(value).find('td').not('.row-click-exclude').each(function(pos, element){
             addLink(element);
         });
    }