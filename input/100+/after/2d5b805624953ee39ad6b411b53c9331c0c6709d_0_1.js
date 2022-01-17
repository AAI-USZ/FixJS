function(index, elem)
    {
        if (index % 2) {
            $(elem).addClass("row2").removeClass("row1")
        } else {
            $(elem).addClass("row1").removeClass("row2")
        }
        if ($(elem).find("[name$='video']").attr('value')) {
            $(elem).find("[name$='sort_order']").attr('value', index);
        } else {
            $(elem).find("[name$='sort_order']").attr('value', '');
        }
        $.each($(elem).find("[name^='playlistitem_set']"), function(j, obj){
            $(obj).attr("id", $(obj).attr("id").replace(/[0-9]+/g, i))
            $(obj).attr("name", $(obj).attr("name").replace(/[0-9]+/g, i))
        });
        i++;
    }