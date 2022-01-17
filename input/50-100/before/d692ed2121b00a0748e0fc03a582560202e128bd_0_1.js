function(object) {
            if (object._guid) return;

            object._guid = guid++;

            _.attributes[object._guid] = {};
            _.eventHandlers[object._guid] = {};
        }