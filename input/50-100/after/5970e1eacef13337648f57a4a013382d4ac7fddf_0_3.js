function graphQuery (id, cmd, success) {
    $.ajax({
        type: "POST",
        url: graphUrl,
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