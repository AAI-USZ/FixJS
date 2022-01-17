function() {

            timeoutId = setTimeout( function(){

                //Remove the click event because the add button should not expand after a successful click-and-hold.

                clickEvent = addButton.click;

                addButton.off('click');

                addSongsFromOpenTabs();

            }, 3000);

        }