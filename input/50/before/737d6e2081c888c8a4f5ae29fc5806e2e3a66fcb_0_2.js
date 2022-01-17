function(key, val) {
                if (val > 0) {
                    $("#cost---" + key).attr('checked','checked')
                } else {
                    $("#cost---" + key).removeAttr('checked')
                }
            }