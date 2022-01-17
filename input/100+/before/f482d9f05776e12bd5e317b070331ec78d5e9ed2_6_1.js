function(event){
        if(this.id == "wgt_display"){
            if(!$(this).hasClass("selected")){                
                $(this).addClass("selected");
                $("#wgt_edit").removeClass("selected");
                $(".style_select").css("display","none");                
                $(this).css("display", "none");
                $("#wgt_edit").css("display", "block");
                displayData(true);
                mode = true;
                sankore.setPreference("qstArrayData", JSON.stringify(questionArray));
                sankore.setPreference("choisir_style", $(".style_select").find("option:selected").val());
            }
        } else {            
            if(!$(this).hasClass("selected")){
                $(this).addClass("selected");
                $("#wgt_display").removeClass("selected");
                $(".style_select").css("display","block");                
                $(this).css("display", "none");
                $("#wgt_display").css("display", "block");
                editData();
                mode = false;
            }
        }
    }