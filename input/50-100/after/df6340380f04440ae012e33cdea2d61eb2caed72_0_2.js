function () {
	var that = this;
        Tomahawk.log("Grooveshark resolver Getting country..." );
        this.apiCall('getCountry', [], function (xhr) {
            var ret = JSON.parse(xhr.responseText);
            that.countryId = JSON.stringify(ret.result);
            Tomahawk.log("Got country id: " + that.countryId);
            window.localStorage['countryId'] = that.countryId;

            // Finally ready
        });
    }