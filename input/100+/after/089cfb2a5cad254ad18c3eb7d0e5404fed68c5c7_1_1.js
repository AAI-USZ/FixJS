function(userArray, callback){
            var requestBundleId = 'sakai.api.User.getMultipleUsers' + Math.random();
            var uniqueUserArray = [];

            // callback function for response from batch request
            var bundleReqFunction = function(success, reqData){
                var users = {};
                if (reqData && reqData.responseId) {
                    for (var j in reqData.responseId) {
                        if (reqData.responseId.hasOwnProperty(j) && reqData.responseData[j]) {
                            users[reqData.responseId[j]] = $.parseJSON(reqData.responseData[j].body);
                        }
                    }
                }
                callback(users);
            };

            for (var i in userArray) {
                if (userArray.hasOwnProperty(i) && $.inArray(userArray[i], uniqueUserArray) === -1) {
                    uniqueUserArray.push(userArray[i]);
                }
            }
            for (var ii in uniqueUserArray) {
                if (uniqueUserArray.hasOwnProperty(ii)) {
                    sakai_serv.bundleRequests(requestBundleId, uniqueUserArray.length, uniqueUserArray[ii], {
                        "url": "/~" + uniqueUserArray[ii] + "/public/authprofile.profile.json",
                        "method": "GET"
                    }, bundleReqFunction);
                }
            }
        }