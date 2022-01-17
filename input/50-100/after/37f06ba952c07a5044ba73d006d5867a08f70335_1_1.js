function() {
        var category = $("#category").val();
        if (category == "illustrated") {
            var url = "/frontpages/all/illustrated/";
        } else {
            var view = $("#view").val();
            var url = "/frontpages/all/" + category + "/" + view + "/";
        }
        window.location.href = url;
        return false;
    }