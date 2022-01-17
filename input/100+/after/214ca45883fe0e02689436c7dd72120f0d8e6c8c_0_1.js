function(e) {
        var request;
        if (e === true) {
          modal.setContent('<img class="loading" src="/assets/images/loading-black.gif">');
          modal.open();
          return request = $.ajax({
            url: ajaxUrl,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            data: {
              "json": _this.handleExport()
            },
            beforeSend: function(x) {
              if (x && x.overrideMimeType) {
                return x.overrideMimeType("application/json;charset=UTF-8");
              }
            },
            success: function(result) {
              modal.setContent(result.message);
              return modal.open();
            }
          });
        }
      }