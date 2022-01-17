function(e) {
                        e.preventDefault(); 
                        
                        var theTarget = e.target;
                        
                        //clear search 
                        that.view.find('#header #searchbar>form>input[type=search]').val('');
                        that.view.find('#header #searchbar>form>button').hide();
                        
                        _hideListSelectButtons(listOverlay); 
                        that._displayList(theTarget.id);
                        
                        return true;
                    }