function () {
    if (tiers.options.autoupdatesettings === "1" || tiers.options.autoupdatesettings === "2") {
        sys.webCall(jsonf(construction.source, "tieroptions"), dljson(resp, contruction.source, "tiersoptions", "tiers", "options"));
    }
    if (tiers.options.autoupdatesettings === "1" || tiers.options.autoupdatesettings === "3") {
        sys.webCall(jsonf(construction.source, "tierlinks"), dljson(resp, contruction.source, "tierslinks", "tiers", "links"));
    }
}