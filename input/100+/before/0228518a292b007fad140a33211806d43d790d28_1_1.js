function() {

    function ResourceManager() {

    }

    var resources = {};

    ResourceManager.addResource = function(key, value) {
        var img = new Image();
        if (value.indexOf("http") === 0) {
            img.src = value;
        } else {
            img.src = "engine/img/" + value;
        }
        resources[key] = img;
    }

    ResourceManager.addLocalResource = function(key, value) {
        ResourceManager.addResource(key, value);
        if ('localStorage' in window && window['localStorage'] !== null) {
            var localResources = JSON.parse(localStorage.getItem("resources"));
            if (localResources == null) {
                localResources = {};
            }
            localResources[key] = value;
            localStorage.setItem("resources", JSON.stringify(localResources));
        }
    }
    /**
     * Returns the resource by the given key
     */
    ResourceManager.getResource = function(key, onLoaded) {
        if (resources[key] !== undefined) {
            var img = new Image();
            if (onLoaded !== undefined) {
                img.addEventListener("load", onLoaded);
            }
            img.src = resources[key].src;
            return img;
        } else {
            return undefined;
        }

    }
    /**
     * Returns the resource key by the given src name
     */
    ResourceManager.getResourceKey = function(src) {
        for (var key in resources) {
            if (src === resources[key].src) {
                return key;
            }
        }

        return undefined;
    }
    /**
     * Removes the resource with the given key
     */
    ResourceManager.removeResource = function(key) {
        delete resources[key];
    }

    ResourceManager.removeLocalResource = function(key) {
        ResourceManager.removeResource(key);
        if ('localStorage' in window && window['localStorage'] !== null && localStorage.getItem("resources") !== null) {
            var localResources = JSON.parse(localStorage.getItem("resources"));
            delete localResources[key];
            localStorage.setItem("resources", JSON.stringify(localResources));
        }
    }

    ResourceManager.getResourceDict = function() {
        return resources;
    }

    ResourceManager.initLocalResources = function() {
        if ('localStorage' in window && window['localStorage'] !== null && localStorage.getItem("resources") !== null) {
            var localResources = JSON.parse(localStorage.getItem("resources"));
            for (var key in localResources) {
                ResourceManager.addResource(key, localResources[key]);
            }
        }
    }

    ResourceManager.getKeyList = function() {
        var resourceKeys = [];
        for (var key in resources) {
            resourceKeys.push(key);
        }
        return resourceKeys;
    }

    return ResourceManager;
}