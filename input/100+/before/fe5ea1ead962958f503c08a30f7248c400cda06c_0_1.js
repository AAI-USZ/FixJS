function createMetaData (element, binder, binderTypeKey, attributeNameChain)
    {
        var metaDataKey = element[elementExpando],
            binderKey = binderTypeKey + ":" + attributeNameChain.join("."),
            elementMetaData, binderMetaData;

        if (!_.isString(metaDataKey)) {
            metaDataKey = element.nodeName + ":" + new Date().getTime();
            element[elementExpando] = metaDataKey;
        }

        elementMetaData = elementMetaDataStore[metaDataKey];

        if (!_.isObject(elementMetaData)) {
            elementMetaData = {};
            elementMetaDataStore[metaDataKey] = elementMetaData;
        }

        binderMetaData = elementMetaData[binderKey];
        if (!_.isObject(binderMetaData)) {
            binderMetaData = {};
            elementMetaData[binderKey] = binderMetaData;
        }

        binderMetaData.binder = binder;

        return binderMetaData;
    }