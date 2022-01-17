function isDeferred(suspiciousObject) {
        //duck-typing
        return _.isObject(suspiciousObject) && suspiciousObject['promise']
            && typeof suspiciousObject['promise'] == 'function'
    }