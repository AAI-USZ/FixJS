function (resource) {
    return resource
            .replace(/_/g, " ")
            .replace(/\%28/g, "(")
            .replace(/\%29/g, ")")
            .replace(/http:\/\/dbpedia\.org\/resource\//gi, "");
}