function(e) {
        var request;
        if (e === true) {
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