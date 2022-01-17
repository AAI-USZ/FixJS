function(){



    $("#selectall").click(function(){
        $('.cbResponseMarker').attr('checked',$(this).attr('checked'));
    });

    $('#browseresponses').qtip({
        content:{
            text:$('#browselangpopup')
        },
        style: { name: 'cream',
            tip:true,
            color:'#111111',
            border: {
                width: 1,
                radius: 5,
                color: '#EADF95'}
        },
        position: { adjust: {
                screen: true, scroll:true },
            corner: {
                target: 'bottomMiddle',
                tooltip: 'topMiddle'}
        },
        show: {effect: { length:50},
            when: {
                event:'click'
        }},
        hide: {fixed:true,
            when: {
                event:'unfocus'
        }}
    });

    // Fix the heigh of the cell
    $('.browsetable td').each(function(){
        if ($(this).text().length> 30){
            $(this).html("<span class=\"content\" title=\""+htmlspecialchars(htmlspecialchars($(this).text(),'ENT_HTML_QUOTE_DOUBLE'),'ENT_QUOTES')+"\">"+$(this).html()+"</span>");
        }
    });
    $('.browsetable th strong').each(function(){
        if ($(this).text().length> 30){
            $(this).addClass("content");
            $(this).attr("title",$(this).text());
        }
    });

    $('.browsetable td span.content').qtip({
        hide: {
            fixed: true,
            delay: 500
        },
        position: {
            corner: {
                target: 'leftMiddle',
                tooltip: 'topRight'
            }
        }
    });
    $('.browsetable th strong.content').qtip({
        hide: {
            fixed: true,
            delay: 500
        },
        position: {
            corner: {
                target: 'leftMiddle',
                tooltip: 'topRight'
            }
        }
    });
    // Delete individual file
    $(".deleteresponse").click(function(){
        thisid=removechars($(this).attr('id'));
        answer = confirm(strdeleteconfirm);
        if (answer==true)
            {
            $('#deleteanswer').val(thisid);
            $('.cbResponseMarker').attr('checked',false);
            $('#resulttableform').submit();
        }
    });
    // Delete all marked responses
    $("#imgDeleteMarkedResponses").click(function(){
        if ($('.cbResponseMarker:checked').size()>0)
            {
            thisid=removechars($(this).attr('id'));
            answer = confirm(strDeleteAllConfirm);
            if (answer==true)
                {
                $('#deleteanswer').val('marked');
                $('#resulttableform').submit();
            }
        }
        else
            alert(noFilesSelectedForDeletion)
    });

    // Download individual file bundle
    $(".downloadfile").click(function() {
        thisid = removechars($(this).attr('id'));
        $('#downloadfile').val(thisid);
        $('.cbResponseMarker').attr('checked', false);
        $('#resulttableform').submit();
    });

    // Download all marked files
    $("#imgDownloadMarkedFiles").click(function() {
        if ($('.cbResponseMarker:checked').size() > 0)
            {
            $('#downloadfile').val('marked');
            $('#resulttableform').submit();
        }
        else
            alert(noFilesSelectedForDnld)
    });


}