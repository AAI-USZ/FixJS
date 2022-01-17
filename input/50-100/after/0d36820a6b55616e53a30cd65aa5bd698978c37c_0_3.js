function(datamodelForNextStep, eventSet, allowWrite) {
        return {
            setData: allowWrite ? function(name, value) {
                return datamodelForNextStep[name] = value;
            } : function() {},
            getData: this._getData.bind(this),
            events: eventSet.iter()
        };
    }