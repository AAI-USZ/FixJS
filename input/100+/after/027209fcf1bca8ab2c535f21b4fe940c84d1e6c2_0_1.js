function () {
    var url;
    if (this.properties_.type == "community") {
        url = dutils.urls.resolve("view_community",
                {community_slug: this.properties_.community_slug});
    } else if (this.properties_.type == "resource") {
        url = dutils.urls.resolve("view_resource", {
                    resource_id: this.properties_.id
                }).replace("//", "/");
    }  else if (this.properties_.type == "organizationbranch") {
        url = dutils.urls.resolve("view_organization", {
                    organization_slug: this.properties_.organization_slug || ""
                }).replace("//", "/");
    }  else {
        var slugname = this.properties_.type + "_slug";
        var params = {"community_slug": this.properties_.community_slug};
        params[slugname] = this.properties_[slugname];
        url = dutils.urls.resolve("view_" + this.properties_.type, params).replace("//", "/");
    }
    return url;
}