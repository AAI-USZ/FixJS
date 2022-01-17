function () {
        var data = $(this).data();
        var path = data.title.split("/");
        var url = github_url + data.date + "-" + path[path.length-1] + ".md";
        window.location = url;
        return false;
    }