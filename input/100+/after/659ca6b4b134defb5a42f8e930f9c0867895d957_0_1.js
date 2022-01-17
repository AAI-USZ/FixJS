function saveCarnet(silent) {
    if (silent == undefined)
        silent = false
    
    //id = getParameterByName("carnet")
    var id = $("#carnetNom").attr("rel")
    $.post("Carnets?action=SAVE", 
        {carnet : id,
         nom : $("#carnetNom").val(),
         date : $("#carnetDate").val(),
         carnetRepr : $("#carnetRepr").val(),
         carnetPhoto : $("#carnetPhoto").val(),
         carnetAlbum : $("#carnetAlbum").val(),
         user: $("#carnetUser").val(),
         desc: $("#carnetDesc").val(),
         carnetText: $("#wmd-input").val()
        },
        function(xml) {
            xml = $(xml)
            setTimeout(function(){$(".carnetSave").val("Enregistrer")}, 5000);
            if (xml.find("exception").text() != "") {
                if (!silent)
                    alert(">"+xml.find("exception").text()+"<")
                $(".carnetSave").val("Error... "+xml.find("exception").text())
            } else {
                if ($("#carnetNom").attr("rel") == "") {
                    id = xml.find("message").text()
                    $("#carnetNom").attr("rel", id)
                    var action = $("#formModifCarnet").attr("action")
                    var idx = action.indexOf("carnet=#")
                    if (idx != -1) {
                        var hashIdx = action.indexOf("#")
                        action = action.substring(0, hashIdx) + id + action.substring(hashIdx)
                        $("#formModifCarnet").attr("action", action)
                    }
                }
            }
            
            autoSaveLocal()
            $(".carnetSave").val("Saved!")
        }
     );
}