function(){
      // show loading indicator
      $(this).data("text", $(this).html());
      $(this).css("width", $(this).outerWidth()).css("height", $(this).outerHeight()).html("").append($.tmpl("tmpl/loading_img"));
      
      // disable click binding
      $(this).unbind("click");
      
      // hide cancle button
      $(this).next(".cancel").hide();
      
      // disable search
      $(target).data("widget").find("#widget_search").attr("disabled", true);
      $(target).data("widget").find(".search").addClass("disabled");
      
      // hide create new
      $(target).data("widget").find(".create_new").hide();
      
      // disable all checkboxes
      $(target).data("widget").find("input[type=checkbox]").attr("disabled", true);
      
      // start submitting
      SetWidget.submit_create_stack(target);
    }