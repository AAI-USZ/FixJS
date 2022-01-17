function(data) {
            html = '';
            $.each(data, function(k, v) {
                html = html + "<li>" + k + " -- " + v + "</li>";
            });

            $('#filemgr #filedetails').html("<ul class='filedetaillist'>" + html + "</ul>");
            $('#filemgr #filedetails').show();
        }