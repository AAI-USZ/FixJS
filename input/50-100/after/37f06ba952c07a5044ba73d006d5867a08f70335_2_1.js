function() {
        category = $("#category").val();
        if (category == 'illustrated') {
            url = "/frontpages/all/illustrated/";
        } else {
            url = "/frontpages/all/" + category + "/words/";
        }
        window.location.href = url;
        return false;
    }