function(){

                //Remove the click event because the add button should not expand after a successful click-and-hold.

                clickEvent = _addButton.click;

                _addButton.off('click');

                _addSongsFromOpenTabs();

            }