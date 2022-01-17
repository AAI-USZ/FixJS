function (err) {
        if (err) {
            VM.log('ERROR', 'Failed to validate payload: ' + err.message);
            callback(err);
            return;
        }
        VM.log('DEBUG', 'normalized payload:\n' + JSON.stringify(payload, null, 2));

        createZoneUUID(payload, function (e, uuid) {
            if (e) {
                callback(e);
            } else {
                if (BRAND_OPTIONS[payload.brand].features.type === 'KVM') {
                    createVM(payload, function (error, result) {
                        if (error) {
                            callback(error);
                        } else {
                            callback(null, {'uuid': payload.uuid,
                                'zonename': payload.zonename});
                        }
                    });
                } else {
                    createZone(payload, function (error, result) {
                        if (error) {
                            callback(error);
                        } else {
                            callback(null, {'uuid': payload.uuid,
                                'zonename': payload.zonename});
                        }
                    });
                }
            }
        });
    }