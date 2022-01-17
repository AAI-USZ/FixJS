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