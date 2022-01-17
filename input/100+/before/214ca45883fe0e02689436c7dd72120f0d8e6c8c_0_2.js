function(e) {
      var ajaxUrl, confirmMessage, modal, this_,
        _this = this;
      this_ = $(e.currentTarget);
      ajaxUrl = this_.attr('data-ajaxUrl');
      modal = new Modalbox();
      modal.setContent('<img class="loading" src="/assets/images/loading-black.gif">');
      confirmMessage = Traduction["notice"]["dataApproval"][window.LANG];
      return this.confirmBox.initConfirmation(confirmMessage, function(e) {
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
      });
    }