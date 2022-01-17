function(){
            collectPickedTags('interesting');
            collectPickedTags('ignored');
            setupTagFilterControl('display');
            var ac = new AutoCompleter({
                url: askbot['urls']['get_tag_list'],
                preloadData: true,
                minChars: 1,
                useCache: true,
                matchInside: true,
                maxCacheLength: 100,
                delay: 10
            });


            var interestingTagAc = $.extend(true, {}, ac);
            interestingTagAc.decorate($('#interestingTagInput'));
            interestingTagAc.setOption('onItemSelect', getResultCallback('good'));

            var ignoredTagAc = $.extend(true, {}, ac);
            ignoredTagAc.decorate($('#ignoredTagInput'));
            ignoredTagAc.setOption('onItemSelect', getResultCallback('bad'));

            $("#interestingTagAdd").click(getResultCallback('good'));
            $("#ignoredTagAdd").click(getResultCallback('bad'));
        }