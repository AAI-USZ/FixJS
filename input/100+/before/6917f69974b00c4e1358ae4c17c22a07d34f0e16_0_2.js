function(event) {
            if ($("#input-area").attr("value") != "") {
                input_data = {};
                input_data["user"] = {};
                input_data["user"]["profile_image_url"] = "http://tp4.sinaimg.cn/1893801487/50/1292405227/1";
                input_data["user"]["screen_name"] = "user1";
                input_data["text"]=$("#input-area").attr("value");
                input_data["created_at"] = new Date();
                $("#read-content").prepend(create_message_util(input_data, 0));
                event.preventDefault();
            }
        }