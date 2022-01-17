function($){
    $.fn.ToggleBodyContents =function()
    {
        this.each(function()
        {
            $(this).click(function()
            {
                $('#slot_' + $(this).attr('ref')).animate({
                  height: 'toggle'
                }, 200);

                return false;
            });
        });

        return this;
    };

    $.fn.ShowBlockEditor =function()
    {
        this.each(function()
        {
            $(this).click(function()
            {
                $(this).OpenEditor();
            });
        });
    };
    
    $.fn.OpenEditor =function()
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

    $.fn.AddBlock =function(type)
    {
        this.each(function()
        {
            var data = $(this).metadata();
            var idBlock = data.id;
            var slotName = data.slotName; 
            var contentType = (type == null) ? data.contentType : type;
            $.ajax({
                type: 'POST',
                url: frontController + 'backend/' + $('#al_available_languages').val() + '/addBlock',
                data: {'page' :  $('#al_pages_navigator').val(),
                       'language' : $('#al_languages_navigator').val(),
                       'idBlock' : idBlock,
                       'slotName' : slotName,
                       'contentType': contentType},
                beforeSend: function()
                {
                    $('body').AddAjaxLoader();
                },
                success: function(response)
                {
                    updateContentsJSon(response);
                },
                error: function(err)
                {
                    $('#al_dialog').html(err.responseText);
                    $('#al_dialog').dialog('open');
                },
                complete: function()
                {
                    $('body').RemoveAjaxLoader();
                }
            });

            return false;
            
        });
    };

    $.fn.EditBlock =function(key, value, options)
    {
        this.each(function()
        {
            value = (value == null) ? encodeURIComponent($(this).val()) : value;
            
            $.ajax({
                type: 'POST',
                url: frontController + 'backend/' + $('#al_available_languages').val() + '/editBlock',
                data: {'page'       :  $('#al_pages_navigator').val(),
                       'language'   : $('#al_languages_navigator').val(),
                       'idBlock'    : $('body').data('idBlock'),
                       'slotName'   : $('body').data("slotName"),
                       'key'        : key,
                       'value'      : value,
                       'options'    : options},
                beforeSend: function()
                {
                    $('body').AddAjaxLoader();
                },
                success: function(response)
                {
                    updateContentsJSon(response);
                },
                error: function(err)
                {
                    $('#al_dialog').html(err.responseText);
                    $('#al_dialog').dialog('open');
                },
                complete: function()
                {
                    $('body').RemoveAjaxLoader();
                }
            });

            return false;
        });
    };
    
    $.fn.ShowExternalFilesManager =function(key)
    {
        this.each(function()
        {
            $(this).click(function()
            {
                $.ajax({
                    type: 'POST',
                    url: frontController + 'backend/' + $('#al_available_languages').val() + '/showExternalFilesManager',
                    data: {'page' :  $('#al_pages_navigator').val(),
                           'language' : $('#al_languages_navigator').val(),
                           'key'      : key},
                    beforeSend: function()
                    {
                        $('body').AddAjaxLoader();
                    },
                    success: function(html)
                    {
                        showMediaLibrary(html);
                    },
                    error: function(err)
                    {
                        $('#al_dialog').html(err.responseText);
                        $('#al_dialog').dialog('open');
                    },
                    complete: function()
                    {
                        $('body').RemoveAjaxLoader();
                    }
                });

                return false;
            });
        });
    };
    
    $.fn.AddExternalFile =function(field, file)
    {
        this.each(function()
        {
            $.ajax({
                type: 'POST',
                url: frontController + 'backend/' + $('#al_available_languages').val() + '/addExternalFile',
                data: {'page' :  $('#al_pages_navigator').val(),
                       'language' : $('#al_languages_navigator').val(),
                       'idBlock' : $('body').data('idBlock'),
                       'slotName' : $('body').data("slotName"),
                       'field'       : field,
                       'file'     : file},
                beforeSend: function()
                {
                    $('body').AddAjaxLoader();
                },
                success: function(response)
                {
                    updateContentsJSon(response);
                },
                error: function(err)
                {
                    $('#al_dialog').html(err.responseText);
                    $('#al_dialog').dialog('open');
                },
                complete: function()
                {
                    $('body').RemoveAjaxLoader();
                }
            });

            return false;
        });
    };
    
    function showMediaLibrary(html)
    {
        if($('body').find("al_media_lib").length == 0)
        {
            $('<div id="al_media_lib"></div>')
                    .css("display", "none")
                    .appendTo('body');
        }
        $('#al_media_lib').html(html);
    }
    
    $.fn.RemoveExternalFile =function(field, fileName)
    {
        this.each(function()
        {
            $(this).click(function()
            { 
                $.ajax({
                    type: 'POST',
                    url: frontController + 'backend/' + $('#al_available_languages').val() + '/removeExternalFile',
                    data: {'page'     :  $('#al_pages_navigator').val(),
                           'language' : $('#al_languages_navigator').val(),
                           'idBlock'  : $('body').data('idBlock'),
                           'field'    : field,
                           'file'     : fileName},
                    beforeSend: function()
                    {
                        $('body').AddAjaxLoader();
                    },
                    success: function(response)
                    {
                        updateContentsJSon(response);
                    },
                    error: function(err)
                    {
                        $('#al_dialog').html(err.responseText);
                        $('#al_dialog').dialog('open');
                    },
                    complete: function()
                    {
                        $('body').RemoveAjaxLoader();
                    }
                });

                return false;
            });
        });
    };

    $.fn.Delete =function()
    {
        this.each(function()
        {
            $(this).click(function()
            {
                $(this).DeleteContent();

                return false;
            });
        });
    };
    
    $.fn.DeleteContent =function()
    {
        var editableData = $(this).metadata();
        var idBlock = editableData.id;
        var slotName = editableData.slotName; 
        
        $.ajax({
            type: 'POST',
            url: frontController + 'backend/' + $('#al_available_languages').val() + '/deleteBlock',
            data: {'page' :  $('#al_pages_navigator').val(),
                   'language' : $('#al_languages_navigator').val(),
                   'slotName' : slotName,
                   'idBlock' : idBlock},
            beforeSend: function()
            {
                $('body').AddAjaxLoader();
            },
            success: function(response)
            {
                updateContentsJSon(response);
            },
            error: function(err)
            {
                $('#al_dialog').html(err.responseText);
                $('#al_dialog').dialog('open');
            },
            complete: function()
            {
                $('body').RemoveAjaxLoader();
            }
        });
    };

}