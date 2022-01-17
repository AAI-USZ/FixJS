function(){

                    // Render the debug info
                    renderDebugInfo($footer_debug_info);

                    // Show the debug info
                    $footer_debug_info.show();

                    // Update button title
                    $footer_logo.attr('title', sakai.api.i18n.getValueForKey('HIDE_DEBUG_INFO', 'footer'));

                }