function (name, options, callback) {
      var url = utils.getPortalUrl() + '#Workspaces/CloudServicesExtension/';
      url += name ? 'CloudService/' + name + '/dashboard' : 'list';

      common.launchBrowser(url);
    }