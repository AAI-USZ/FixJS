function (query, callBack) {
        callBack = $data.typeSystem.createCallbackSetting(callBack);

        var sql;
        try {
            sql = this._compile(query);
        } catch (e) {
            callBack.error(e);
            return;
        }
        var schema = this.context;

        var requestData = {
            url: this.providerConfiguration.oDataServiceHost + sql.queryText,
            dataType: "JSON",
            success: function (data, textStatus, jqXHR) {
                if (callBack.success) {
                    query.rawDataList = typeof data === 'number' ? [{ cnt: data }] : data;
                    callBack.success(query);
                }
            },
            error: function (jqXHR, textStatus, errorThrow) {
                callBack.error(errorThrow);
            }
        };

        this.context.prepareRequest.call(this, this._setAjaxAuthHeader(requestData));
        $data.ajax(requestData);
    }