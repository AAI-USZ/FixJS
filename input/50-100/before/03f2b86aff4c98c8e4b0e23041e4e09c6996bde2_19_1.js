function (text, callback) {

        $.getJSON(this._suggestUrl + text, function (response) {

            var suggestions = [];



            for (entry in response[1]) {

                suggestions.push(response[1][entry][0]);

            }



            callback(suggestions);

        });

    }