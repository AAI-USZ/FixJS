function SetTitle(itemID){
            var name= prompt("Enter the custom title you want to have")
            if (name!=null && name!="") {
                $('#' + itemID).raw().value = name;
            }
        }