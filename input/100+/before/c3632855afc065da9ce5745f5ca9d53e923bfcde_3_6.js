function() {
            var that = this;
            
            var searchInFocus = function() { 
                var jqthat = $j(this);
                jqthat.windowTouch(function() {return false;}, function() { jqthat.blur(); return true; }, false);
            }
            var searchTextChange = function() { 
                var jqthat = $j(this);
                if(jqthat.val().length > 0)  {
                    jqthat.next().show(); 
                } else {
                    jqthat.next().hide(); 
                }
            }
            var onSubmit = function() {
                var text = $j(this).find('input[type=search]').blur().val();
                text = text.trim();
                if (text.length > 1 && !text.startsWith('*')) {
                    that.mode = "search";
                    that.view.find('#header #titlebar #title').html('Search Results');
                    if (typeof that.options.onSearch == 'function') that.options.onSearch(text);
                }
                return false;
            }
            that.view.find('#header #searchbar>form').submit(onSubmit);
            that.view.find('#header #searchbar>form>input[type=search]').focusin(searchInFocus).bind('keydown', searchTextChange).bind('keyup', searchTextChange);
            that.view.find('#header #searchbar #closebutton').click(function(e) {
                e.preventDefault(); 
                $j(this).hide().prev().val('').blur();
                if (that.mode == 'search') {
                    that._displayList(that.selectedListId);
                    that.mode = 'list';
                }
            });
        }