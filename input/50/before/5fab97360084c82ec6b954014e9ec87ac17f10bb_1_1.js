function () {
        var el = '#index_' + $(this).text();
        $('#Artists').stop().scrollTo(el, 400);
        return false;
    }