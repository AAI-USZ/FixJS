function graphQuery (id, cmd, success) {
    $.ajax({
        type: "POST",
        url: site_url + '/admin/statistics/graph',
        data: {
            'id': id,
            'cmd': cmd, 
        },
        success: success,
        error: function (res) 
        {
                ajaxError();
        }
    });
}