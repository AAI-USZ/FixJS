function(service/*, method, args..., callback*/) {
    if(arguments.length < 3) throw new Error("No callback specified");

    var args = Array.prototype.slice.call(arguments, 1);
    var cached = this._services[service];

    if(!cached) {
        throw new Error("Unknown service");
    } else if(!cached.client) {
        cached.client = this._createClient(cached.endpoint);
    }

    cached.client.invoke.apply(cached.client, args);
}