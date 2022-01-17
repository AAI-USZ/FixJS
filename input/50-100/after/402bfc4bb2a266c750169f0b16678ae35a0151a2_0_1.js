function(arguments) {
                return sinon.stub({
                    uid: null,
                    activateTimestamp: null,
                    createTimestamp: null,
                    expiredTimestamp: null,
                    startTimestamp: null,
                    deviceId: null,
                    notificationType: null,
                    notificationUri: null,
                    postedBy: null,
                    pushAddress: null,
                    pushAddressType: null,
                    pushType: null,
                    regionCode: null,
                    serviceId: null,
                    sessionId: null,
                    status: null,
                    arguments: arguments
                });
            }