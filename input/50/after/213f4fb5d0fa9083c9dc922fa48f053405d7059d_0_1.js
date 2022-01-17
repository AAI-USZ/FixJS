function(data){
                    if(data == 1){
                        /*$("#msg").removeClass("error");
                        $("#msg").addClass("success");
                        $("#msg").html("Nos contactaremos con usted");
                        $("#msg").fadeIn(1000, function(){*/
                        //setTimeout("$(location).attr('href','.')",2000);
                        alert("Sus datos se han enviado correctamente");
                        resetForm();
                        window.parent.$.prettyPhoto.close();
                        //});
                    }else{
                        alert("Lo sentimos, no es posible gestionar su solicitud. Intente mas tarde.");
                    }
            }