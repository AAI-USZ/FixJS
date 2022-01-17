function(e) {
                e.preventDefault(); 
                $j(this).hide().prev().val('').blur();
                if (that.mode == 'search') {
                    that.displayList(that.selectedListId);
                    that.mode = 'list';
                }
            }