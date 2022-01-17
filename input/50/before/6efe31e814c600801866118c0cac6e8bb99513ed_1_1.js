function() {
            KIJ2013.init();
            createDatabase();
            displayEventsList();
            fetchItems();
            // Hides mobile browser's address bar when page is done loading.
            setTimeout(function() {window.scrollTo(0, 1);}, 1);
        }