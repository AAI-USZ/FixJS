function(item){
            var term = $("#token-input-id_to").val();
            if (item.display_name) {
                return ("<li><div class='name_search'>" +
                        wrapTerm(item.display_name, term) + " [" +item.username +  "]</div></div></li>");
            }
            return ("<li><div class='name_search'>" + item.username + "</div></li>");
        }