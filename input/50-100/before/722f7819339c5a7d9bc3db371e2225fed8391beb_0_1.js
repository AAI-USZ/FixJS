function(event){                     //watch for a button press
        console.log("clicked: " + $(this).attr('id'));
        toggleDisplay($(this).attr('id'));                          //send id of clicked button to toggle display
    }