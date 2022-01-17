function() {
        this._api_wrapper.trackEvent(wooga.castle.playerData.kontagent_id,
            'tutorial_done',
            {},
            function () {},
            function(error) {
                window.alert("Could not send tutorial_done EVT due to " + error);
            });
    }