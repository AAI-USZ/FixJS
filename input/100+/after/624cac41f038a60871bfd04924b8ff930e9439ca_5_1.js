function(){
                // Translate the jquery.timeago.js plugin
                $.timeago.settings.strings = {
                    prefixAgo: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_PREFIXAGO"),
                    prefixFromNow: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_PREFIXFROMNOW"),
                    suffixAgo: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_SUFFIXAGO"),
                    suffixFromNow: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_SUFFIXFROMNOW"),
                    seconds: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_SECONDS"),
                    minute: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_MINUTE"),
                    minutes: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_MINUTES"),
                    hour: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_HOUR"),
                    hours: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_HOURS"),
                    day: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_DAY"),
                    days: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_DAYS"),
                    month: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_MONTH"),
                    months: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_MONTHS"),
                    year: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_YEAR"),
                    years: sakaii18nAPI.getValueForKey("JQUERY_TIMEAGO_YEARS")
                };
                // Translate the jquery.pager.js plugin
                $.fn.pager.defaults.htmlparts = {
                    'first' : sakaii18nAPI.getValueForKey('FIRST'),
                    'last' : sakaii18nAPI.getValueForKey('LAST'),
                    'prev' : '<span><div class=\"sakai_pager_prev\"></div> <button class="t" title="' + sakaii18nAPI.getValueForKey('PREVIOUS_PAGE') + '">' + sakaii18nAPI.getValueForKey('PREV') + '</button></span>',
                    'next' : '<span><button class="t" title="' + sakaii18nAPI.getValueForKey('NEXT_PAGE') + '">' + sakaii18nAPI.getValueForKey('NEXT') + '</button><div class=\"sakai_pager_next\"></div></span>',
                    'current': '<li class="page-number"><button title="' + sakaii18nAPI.getValueForKey('PAGE') + ' ${page}">${page}</button></li>'
                };

            }