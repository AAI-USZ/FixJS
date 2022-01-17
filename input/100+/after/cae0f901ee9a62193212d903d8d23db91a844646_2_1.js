function() {
                var text = $j(this).find('input[type=search]').blur().val();
                text = text.trim();
                if (text.length > 1 && !text.startsWith('*')) {
                    that.searchTextLength = text.length;
                    that.listFetchStartTime = Date.now();
                    that.mode = "search";
                    that.view.find('#header #titlebar #title').html('Search Results');
                    if (typeof that.options.onSearch == 'function') that.options.onSearch(text);
                }
                return false;
            }