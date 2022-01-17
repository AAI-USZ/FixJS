function (resource) {
    return resource.replace(/_/g, " ")
            .replace(/http:\/\/dbpedia\.org\/resource\/|\%28|\%29/gi, "");
}