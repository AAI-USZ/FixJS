function(data) {
            html = "<span class='filedetailsclose'>X</span>"
            html = html + "<h3 id='filename'>" + data.relpath + "</h3>";
            html = html + "<a href='" + server_url + data.relpath +"?contents=true' title='View/Download File' class='filestream'>View/Download</span>";

            $('#filemgr #filedetails').html(html);
            $('#filemgr #filedetails').show();
        }