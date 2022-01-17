function getData () {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("There is no data in Local Storage so default data was added.");
            autoFillData();
        };
        //displayLink(localStorage); // build the data to display on the list page
        $.mobile.changePage('#displaydata'); // go to page to display list
    }