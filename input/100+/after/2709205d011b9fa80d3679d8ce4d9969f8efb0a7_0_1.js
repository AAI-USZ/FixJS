function(callback) {
                // Show the background images used on anonymous user pages
                if ($.inArray(window.location.pathname, sakai_conf.requireAnonymous) > -1) {
                    $('html').addClass('requireAnon');
                // Show the normal background
                } else {
                    $('html').addClass('requireUser');
                }
                sakai_util.loadSkinsFromConfig();

                // Put the title inside the page
                var pageTitle = require('sakai/sakai.api.i18n').getValueForKey(sakai_conf.PageTitles.prefix);
                if (sakai_conf.PageTitles.pages[window.location.pathname]) {
                    pageTitle += ' ' + require('sakai/sakai.api.i18n').getValueForKey(sakai_conf.PageTitles.pages[window.location.pathname]);
                }
                document.title = pageTitle;
                // Show the actual page content
                $('body').removeClass('i18nable');
                if ($.isFunction(callback)) {
                    callback();
                }
            }