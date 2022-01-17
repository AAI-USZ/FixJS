function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"testuuid1\",\"display\":\"testdoc1\"}," + "{\"uuid\":\"testuuid2\",\"display\":\"testdoc2\"}]}",
                status: 200
            };
            request.callback(null, true, response)
        }