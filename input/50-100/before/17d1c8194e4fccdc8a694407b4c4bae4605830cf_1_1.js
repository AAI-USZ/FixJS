function(e) {
        var el = $(e.target);
        
        Router.setPage("search?q="+el.val(), "search");

        Session.set("signal", null)   
        e.preventDefault();
    }