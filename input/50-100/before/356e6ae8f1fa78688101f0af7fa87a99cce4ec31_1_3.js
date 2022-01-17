function(cbsArray, event, callback, context) {
            if (!callback || !event) return this;
            var eventCbs = cbsArray[event] || (cbsArray[event] = []);
            eventCbs.push({callback: callback, context: context});
            return this;
        }