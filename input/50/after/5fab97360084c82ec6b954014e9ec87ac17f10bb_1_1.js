function () {
        var el = 'a[name = "index_' + $(this).text() + '"]';
        $('#Artists').stop().scrollTo(el, 400);
        return false;
    }