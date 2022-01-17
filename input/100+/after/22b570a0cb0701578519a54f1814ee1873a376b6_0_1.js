function(e) {
        // Prevent the event from refreshing the page
        e.preventDefault();
var index = Y.one("#filterYear").get('selectedIndex');
var value = Y.one("#filterYear").get("options").item(index).getAttribute('value');
if(value=="all") {
 Y.all('div.yeardiv').removeClass('cophidden');
} else {
 Y.all('div.yeardiv').addClass('cophidden');
 Y.all('div.copyear'+value).removeClass('cophidden');
}
   // Store the users selection (Uses AJAX to save to the database)
        M.util.set_user_preference('courseoverviewplusselectedyear', value);
    }