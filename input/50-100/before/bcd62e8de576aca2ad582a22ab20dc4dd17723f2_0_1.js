function() {
      if (location.href.indexOf("#") != -1) {
        var url = $("input[name=\'_wp_http_referer\']").val(),
            hash = location.href.substr(location.href.indexOf("#"));
        $("input[name=\'_wp_http_referer\']").val( url + hash );
        this.scroll_to_top();
      }
      setTimeout( function() {
        $(".wrap.settings-wrap .fade").fadeOut("fast");
      }, 3000 );
    }