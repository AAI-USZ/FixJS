function introspectService(service) {
    var container = $("#introspectorResults");
    container.empty();

    if(service) {
        var content = tmpl("introspectorResultsTemplate", {
            methods: client._services[service].introspected.methods
        });
        
        container.append($(content));
    }
}