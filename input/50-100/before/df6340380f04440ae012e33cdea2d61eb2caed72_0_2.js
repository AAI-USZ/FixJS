function () {
        Tomahawk.log("Grooveshark resolver Getting country..." );
        this.apiCall('getCountry', [], function (xhr) {
            var ret = JSON.parse(xhr.responseText);
            this.countryId = JSON.stringify(ret.result);
            Tomahawk.log("Got country id: " + this.countryId);
            window.localStorage['countryId'] = this.countryId;

            // Finally ready
        });
    }