function(e) {
        // Prevent the event from refreshing the page
        e.preventDefault();
var index = Y.get("#filterTeacher").get('selectedIndex');
var value = Y.get("#filterTeacher").get("options").item(index).getAttribute('value');
if(value=="all") {
 Y.all('div.teacherdiv').removeClass('cophidden');
} else {

 Y.all('div.teacherdiv').addClass('cophidden');
 Y.all('div.copteacher'+value).removeClass('cophidden');
}
   // Store the users selection (Uses AJAX to save to the database)
      M.util.set_user_preference('courseoverviewplusselectedteacher', value);
    }