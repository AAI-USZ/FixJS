function(){
            $("header .btn-group .btn").click(function(){
                $("button.active").removeClass("active");
                $(this).addClass("active")
                if($(this).attr("id")=="50-50"){
                    lastLayout="50-50";
                }else{
                    lastLayout="exact";
                }
                resizeHandler();
                StorageManager.save("layout",lastLayout);
            })

            if(StorageManager.has("data")){
                $("textarea").val(StorageManager.get("data"));
            }else{ //first time visit
                $.ajax({
                    url: "./example.md",
                }).success(function(data){
                    $("textarea").val(data);
                    resizeHandler();
                    update();
                });
            }
            if(StorageManager.has("type")){
                $("#type :contains('"+StorageManager.get("type")+"')").attr("selected","selected");
            }
            if(StorageManager.has("layout")){
                $("#"+StorageManager.get("layout")).trigger("click")
            }
            
            $("#type").change(update);
            $(window).resize(resizeHandler);
            resizeHandler();
            update();
        }