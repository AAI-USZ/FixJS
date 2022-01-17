function() {
        var category = $("#category").val();
        var view = $("#view").val();
        var url = "/frontpages/all/" + category + "/" + view + "/";
        window.location.href = url;
        return false;
    }