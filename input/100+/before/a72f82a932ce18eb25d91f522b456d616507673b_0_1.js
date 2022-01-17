function filemgr_get_file_details() {
    $.ajax({
        url: server_url + current_path,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            html = '';
            $.each(data, function(k, v) {
                html = html + "<li>" + k + " -- " + v + "</li>";
            });

            $('#filemgr #filedetails').html("<ul class='filedetaillist'>" + html + "</ul>");
            $('#filemgr #filedetails').show();
        }
    });
}