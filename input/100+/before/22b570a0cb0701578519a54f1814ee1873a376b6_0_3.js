function(e) {
        // Prevent the event from refreshing the page
        e.preventDefault();
var index = Y.get("#filterCategory").get('selectedIndex');
var value = Y.get("#filterCategory").get("options").item(index).getAttribute('value');
if(value=="all") {
 Y.all('div.categorydiv').removeClass('cophidden');
} else {
 Y.all('div.categorydiv').addClass('cophidden');
 Y.all('div.copcategory'+value).removeClass('cophidden');
}
   // Store the users selection (Uses AJAX to save to the database)
        M.util.set_user_preference('courseoverviewplusselectedcategory', value);
    }