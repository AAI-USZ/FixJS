function(listId) {
        
            var that = this, listButton;
            
            if (listId) listButton = that.view.find('#header #listselect button#' + listId);
            else listButton = that.view.find('#header #listselect button#recent');
            
            that.view.find('#header #titlebar #title').text(listButton.text());
            
            that.selectedListId = listButton[0].id;
            
            if (typeof that.options.onListSelect == 'function') {
                that.options.onListSelect(that.selectedListId);
            }
        }