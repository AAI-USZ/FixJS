function() {
                            var str = $('#TB_iframeContent').attr('src');
                            if ( str.indexOf( "&field_id=" ) !== -1 ) {
                              $('#TB_iframeContent').contents().find('#tab-type_url').hide();
                            }
                            $('#TB_iframeContent').contents().find('.savesend .button').val(option_tree.upload_text); 
                          }