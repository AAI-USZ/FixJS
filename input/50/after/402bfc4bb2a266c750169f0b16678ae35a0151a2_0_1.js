function(deviceId, manufacturer, model, dmVersion, language) {
                return sinon.stub({
                    deviceId: deviceId,
                    manufacturer: manufacturer,
                    model: model,
                    dmVersion: dmVersion,
                    language: language,
                });
            }