function (data, textStatus, jqXHR) {
        $(".domain_list").empty();
        if (data.length) {
          $.each(data, function (i, elem) {
            $("<li><a href=\"http://"+elem+"/\">"+elem+"</a></li>").appendTo(".domain_list");
          });
        } else {
          $(".ajax_not_found").show();
        }
      }