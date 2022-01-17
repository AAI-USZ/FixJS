function (target) {
        /// <summary>
        /// Extends an object with properties of additional parameters.
        /// </summary>
        /// <signature>
        /// <param name="target" type="Object">Object that will be extended.</param>
        /// <param name="object" type="Object">Object to extend target with.</param>
        /// <param name="objectN" optional="true" parameterArray="true" type="Object">Object to extend target with.</param>
        /// </signature>        
    	/// <returns></returns>

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (obj === null || typeof obj === 'undefined')
                continue;
            for (key in obj) {
                target[key] = obj[key];
            }
        }        
        return target;
    }