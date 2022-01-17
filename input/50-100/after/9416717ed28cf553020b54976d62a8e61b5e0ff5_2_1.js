function(item){
            var term = $("#token-input-id_to").val();
            if (item.display_name) {
                return k.safeInterpolate('<li><div class="name_search">%(display_name)s [%(username)s]</div></li>', item, true);
            }
            return k.safeInterpolate('<li><div class="name_search">%(username)s</div></li>', item, true);
        }