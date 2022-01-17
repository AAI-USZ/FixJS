function (data, textStatus, jqXHR) {
        if (data.length) {
          $(".domain_list").empty();
          $.each(data, function (i, elem) {
            $("<li><a href=\"http://"+elem+"/\">"+elem+"</a></li>").appendTo(".domain_list");
          });
        } else {
          $(".ajax_not_found").show();
        }
      }