function () {
            var regexS = "(/(?:(?:r)|(?:user))/[^&#?]*)[?]?(.*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.href);
            //console.log(results);
            if (results == null) {
                return ["", ""];
            } else {
                return [results[1], decodeUrl(results[2])];
            }
        }