function(e) {
        var el = $(e.target);
        
        Router.setPage("search?q="+el.val(), "search");
        Session.set("signal_filter", {search: el.val()}); 
        Session.set("signal", null)   
        e.preventDefault();
    }