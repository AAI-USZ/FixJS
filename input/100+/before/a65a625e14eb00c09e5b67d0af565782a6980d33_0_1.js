function()
    {
        if(isEditorOpened)
        {
            return;
        }

        var editableData = $(this).metadata();
        var idBlock = editableData.id;
        var slotName = editableData.slotName; 

        $.ajax({
            type: 'POST',
            url: frontController + 'backend/' + $('#al_available_languages').val() + '/al_showBlocksEditor',
            data: {'page' :  $('#al_pages_navigator').val(),
                   'language' : $('#al_languages_navigator').val(),
                   'idBlock' : idBlock,
                   'slotName' : slotName},
            beforeSend: function()
            {
                $('body').AddAjaxLoader();
            },
            success: function(response)
            {
                try
                {
                    $.parseJSON(response);
                    updateContentsJSon(response);
                }
                catch(e)
                {
                    showMediaLibrary(response);
                }
                
                $('body').data('idBlock', idBlock).data('slotName', slotName);
                isEditorOpened = true;
            },
            error: function(err)
            {
                console.log('An editor has been occoured opening the editor');
                $('#al_dialog').html(err.responseText);
                $('#al_dialog').dialog('open');
            },
            complete: function()
            {
                $('body').RemoveAjaxLoader();
            }
        });
    }