function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["_", "jQuery","Backbone"], factory);
    }
}