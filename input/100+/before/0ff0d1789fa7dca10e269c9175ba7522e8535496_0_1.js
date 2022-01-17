function _addJobs(baseObj, additionObj) {
       for (var field in additionObj) {
            if (!baseObj[field]) {
                baseObj[field] = additionObj[field];
            } else {
                if (typeof(baseObj[field]) == "object"){
                    _addJobs(baseObj[field], additionObj[field]);
                } else { // should be number
                    baseObj[field] += additionObj[field];
                }
            }
        } 
    }