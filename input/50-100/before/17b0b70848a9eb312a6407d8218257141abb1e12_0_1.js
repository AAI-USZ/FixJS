function(data) {
            var url = "";
            if(typeof data.album !== "undefined") {
                url = _.find(data.album.image, function(i) { return i.size == size; })["#text"];
                if(typeof url === "undefined" || url == "") url = "/img/default_"+size+".png";
            } else {
                url = "/img/default_"+size+".jpg";
            }
            cb(url);
        }