function rpcMethod(service, method) {
    var args = client._services[service].introspected.methods[method].args;
    var content = tmpl("rpcArgsTemplate", { args: args });
    $("#rpcArgs").empty().append($(content));

    $("#rpcArgs form").submit(function(e) {
        e.preventDefault();
        rpcInvoke(service, method, function() {});
        return false;
    });
}