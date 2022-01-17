function (requestMetadata) {
            var urls = requestMetadata.environmentUrls, 
                html = ''; 

            if (urls) {
                var currentName = 'Enviro', 
                    currentDomain = util.getDomain(unescape(window.location.href));

                for (targetName in urls) {
                    if (util.getDomain(urls[targetName]) === currentDomain) {
                        currentName = targetName;
                        html += ' - ' + targetName + ' (Current)<br />';
                    }
                    else
                        html += ' - <a title="Go to - ' + urls[targetName] + '" href="' + urls[targetName] + '">' + targetName + '</a><br />';
                }
                html = '<span class="glimpse-drop">' + currentName + '<span class="glimpse-drop-arrow-holder"><span class="glimpse-drop-arrow"></span></span></span><div class="glimpse-drop-over"><div>Switch Servers</div>' + html + '</div>';
            }
            return html;
        }