function rpcService(service) {
    var container = $("#rpcMethod");
    container.empty();

    if(service) {
        var content = tmpl("rpcMethodsTemplate", {
            methods: client._services[service].introspected.methods
        });    

        container.append($(content));
    }
}