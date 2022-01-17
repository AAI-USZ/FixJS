function saveCarnet(silent) {
    if (silent == undefined)
        silent = false
    
    //id = getParameterByName("carnet")
    id = $("#carnetNom").attr("rel")
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
                $(".carnetSave").val("Error...")
            }
            autoSaveLocal()
            $(".carnetSave").val("Saved!")
        }
     );
}