function iterableProxy(arr) {
    return Proxy.create({
        getPropertyDescriptor: function (name) {
            for (var obj = arr; obj; obj = Object.getPrototypeOf(obj)) {
                var desc = Object.getOwnPropertyDescriptor(obj, name);
                if (desc)
                    return desc;
            }
            return undefined;
        }
    });
}