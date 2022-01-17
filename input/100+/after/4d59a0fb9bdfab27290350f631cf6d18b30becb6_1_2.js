function() {
      var params, slugname;
      if (this.properties.type === 'Community') {
        return dutils.urls.resolve('view_community', {
          community_slug: this.properties.community_slug
        });
      } else if (this.properties.type === 'Resource') {
        return dutils.url.resolve('view_resource', {
          resource_id: this.properties.id
        }).replace('//', '/');
      } else if (this.properties.type === 'OrganizationBranch') {
        return dutils.url.resolve('view_organization', {
          organization_slug: this.properties.organization_slug
        }).replace('//', '/');
      } else {
        slugname = "" + (this.properties.type.toLowerCase()) + "_slug";
        params = {
          community_slug: this.properties.community_slug
        };
        params[slugname] = this.properties[slugname];
        return dutils.url.resolve("view_" + (this.properties.type.toLowerCase()), params).replace('//', '/');
      }
    }