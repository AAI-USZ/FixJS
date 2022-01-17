function() {
           $("#district-autocomplete").val("");
           $("#providerId-autocomplete").val("");
           $("#providerId").html("");
           $("#providerId").data('combobox').destroy();
           $("#providerId").combobox();
    }