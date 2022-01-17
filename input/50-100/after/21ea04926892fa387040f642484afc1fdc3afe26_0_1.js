function(result){
        var network_options = $("select[id$=_network]").empty();
        $.each(result, function() {
          network_options.append($("<option />").val(this.id).text(this.name));
        });
      }