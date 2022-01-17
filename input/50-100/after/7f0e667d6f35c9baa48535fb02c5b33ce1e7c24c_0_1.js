function () {
        var data = $(this).data();
        var url = github_url + data.filename;
        window.location = url;
        return false;
    }