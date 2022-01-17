function () {
        if (_instance) {
            throw 'Kontagent was already initialized';
        }
        _instance = this;

        this._api_wrapper = new KontagentApi(KONTAGENT_API_KEY, {
            'useTestServer':true,
            'validateParams':true
        });
    }