function() {
        if($("#attribute_type").val()=="TB" || $("#attribute_type").val()=="DP")
            {
                $("#dd").hide();
            }
        else if($("#attribute_type").val()=="DD")
            {
                $("#dd").show();
            }
        else
            {
                $("#dd").hide();
            }
    }