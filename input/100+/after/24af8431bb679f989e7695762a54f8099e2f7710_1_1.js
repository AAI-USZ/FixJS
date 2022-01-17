function() {
        $('div#emptyDialog').dialog({title: PMA_messages['strImportDialogTitle']});
        $('div#emptyDialog').html(PMA_messages['strImportDialogMessage'] + ':<br/><form action="file_echo.php?' + url_query + '&import=1" method="post" enctype="multipart/form-data">' +
            '<input type="file" name="file"> <input type="hidden" name="import" value="1"> </form>');
        
        var dlgBtns = {};
        
        dlgBtns[PMA_messages['strImport']] = function() {
            var $iframe, $form;
            $('body').append($iframe = $('<iframe id="monitorConfigUpload" style="display:none;"></iframe>'));
            var d = $iframe[0].contentWindow.document;
            d.open(); d.close();
            mew = d;
            
            $iframe.load(function() {
                var json;

                // Try loading config
                try {
                    var data = $('body', $('iframe#monitorConfigUpload')[0].contentWindow.document).html();
                    // Chrome wraps around '<pre style="word-wrap: break-word; white-space: pre-wrap;">' to any text content -.-
                    json = $.secureEvalJSON(data.substring(data.indexOf("{"), data.lastIndexOf("}") + 1));
                } catch (err) {
                    alert(PMA_messages['strFailedParsingConfig']);
                    $('div#emptyDialog').dialog('close');
                    return;
                }
            
                // Basic check, is this a monitor config json?
                if (!json || ! json.monitorCharts || ! json.monitorCharts) {
                    alert(PMA_messages['strFailedParsingConfig']);
                    $('div#emptyDialog').dialog('close');
                    return;
                }
                
                // If json ok, try applying config
                try {
                    window.localStorage['monitorCharts'] = $.toJSON(json.monitorCharts);
                    window.localStorage['monitorSettings'] = $.toJSON(json.monitorSettings);
                    rebuildGrid();
                } catch(err) {
                    alert(PMA_messages['strFailedBuildingGrid']);
                    // If an exception is thrown, load default again
                    window.localStorage.removeItem('monitorCharts');
                    window.localStorage.removeItem('monitorSettings');
                    rebuildGrid();
                }
                
                $('div#emptyDialog').dialog('close');
            });
            
            $("body", d).append($form = $('div#emptyDialog').find('form'));
            $form.submit();
            $('div#emptyDialog').append('<img class="ajaxIcon" src="' + pmaThemeImage + 'ajax_clock_small.gif" alt="">');
        };
        
        dlgBtns[PMA_messages['strCancel']] = function() {
            $(this).dialog('close');
        }
        
        
        $('div#emptyDialog').dialog({
            width: 'auto',
            height: 'auto',
            buttons: dlgBtns
        });
    }