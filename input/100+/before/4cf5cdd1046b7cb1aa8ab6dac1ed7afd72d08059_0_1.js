function() {
        newspaper_id = $("#newspaper").val();
        year = $("#year").val();
        month = $("#month").val();
        day = $("#day").val();
        view = $("#view").val();
        url = "/frontpages/" + newspaper_id + "/";
        if (year) { url += year + "/";}
        if (year && month) { url += month + "/";}
        if (year && month && day) { url += day + "/";}
        if (!day && view) { url += view + "/";}
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