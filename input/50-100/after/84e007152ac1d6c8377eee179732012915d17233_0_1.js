function(_data, textStatus){
                    var success = true;
                    if (_data && _data.results && _data.results[0] && _data.results[0].error) {
                        success = false;
                        if (_data.results[0].error === "Invalid group id") {
                            data.errorMessage = "GROUP_CREATION_ERROR_INVALID_ID";
                        }
                    }
                    callback(success, data);
                }