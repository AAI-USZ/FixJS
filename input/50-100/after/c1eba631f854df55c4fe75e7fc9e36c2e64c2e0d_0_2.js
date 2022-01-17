function(message) {
        this._api_wrapper.trackEvent(wooga.castle.playerData.kontagent_id,
            'contract_started',
            {
                'subtype1': message.entity.getProperName().replace(/\s/g, '').substring(0,32)
            },
            function () {},
            function(error) {
                window.alert("Could not send contract_started EVT due to " + error);
            });
    }