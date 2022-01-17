function() {
        newspaper_id = $("#newspaper").val();
        year = $("#year").val();
        month = $("#month").val();
        day = $("#day").val();
        view = $("#view").val();
        url = "/frontpages/" + newspaper_id + "/";
        if (year > 0) { url += year + "/";}
        if (year > 0 && month > 0) { url += month + "/";}
        if (year > 0 && month > 0 && day > 0) { url += day + "/";}
        if (day == 0 && view) { url += view + "/";}
        categories = []
        $('input:checkbox:checked').each(function() {
            categories.push($(this).val());
        })
        if (categories.length > 0) {
            url += "?category=" + categories.join('&category=')
        }
        window.location.href = url;
        return false;
    }