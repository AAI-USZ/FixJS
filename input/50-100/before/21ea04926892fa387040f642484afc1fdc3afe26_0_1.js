function(result){
        var network_options = $("[id$=_network]").empty();
        $.each(result, function() {
          network_options.append($("<option />").val(this.id).text(this.name));
        });
      }