function SetTitle(itemID){
            var name= prompt("Enter the custom title you want to have\n(max 32 chars)")
            if (name!=null && name!="") {
                $('#' + itemID).raw().value = name;
            }
        }