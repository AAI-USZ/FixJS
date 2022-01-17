function() {
                ed.onNodeChange.add(t._nodeChanged, t);

                // eZ: workaround for http://issues.ez.no/19254 to make TinyMCE/ezoe work in Firefox 11
                // affects only TinyMCE <= 3.4.5
                ed.getWin().frameElement.style.display = 'block';

                // eZ: workaround for http://issues.ez.no/19254 to make TinyMCE/ezoe work in Firefox 11
                // affects only TinyMCE <= 3.4.5
                ed.getWin().frameElement.style.display = 'block';

                ed.addShortcut('ctrl+8', '', ['FormatBlock', false, '<pre>']);
                ed.addShortcut('ctrl+9', '', ['FormatBlock', false, '<pre>']);
                if ( s.theme_ez_content_css )
                {
                    var css_arr = s.theme_ez_content_css.split(',');
                    for ( var ind = 0, len = css_arr.length; ind < len; ind++ )
                       ed.dom.loadCSS( css_arr[ind] );
                }
                else if (ed.settings.content_css !== false)
                    ed.dom.loadCSS(ed.baseURI.toAbsolute("themes/ez/skins/" + ed.settings.skin + "/content.css"));
            }