function() {
        category = $("#category").val();
        url = "/frontpages/all/" + category + "/words/";
        window.location.href = url;
        return false;
    }