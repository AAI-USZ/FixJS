function(index, element){
            var tab = $(element);
            var tab_name = tab.attr('id').replace(/^by_/,'');
            if (tab_name in sortButtonData){
                href = search_url + QSutils.patch_query_string(query_string, 'sort:'+tab_name+'-desc');
                tab.attr('href', href);
                tab.attr('title', sortButtonData[tab_name]['desc_tooltip']);
                tab.html(sortButtonData[tab_name]['label']);
            }
        }