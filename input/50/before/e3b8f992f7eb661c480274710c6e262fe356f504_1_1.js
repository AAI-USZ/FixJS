function (name, options, callback) {
      var url = utils.portal() + '#Workspaces/CloudServicesExtension/';
      url += name ? 'CloudService/' + name + '/dashboard' : 'list';

      common.launchBrowser(url);
    }