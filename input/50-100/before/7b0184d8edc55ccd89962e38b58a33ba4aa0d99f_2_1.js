function(options) {
      options = options || {};

      /**
       * Very important security info - it is assumed all parameters are
       * already properly escaped before being passed here.  This is done
       * in dialog.js.  Check it.
       *
       * hostname is set internally based on the RP URL,
       * so it will not be escaped.  It is set initially in user.js at the very
       * bottom for the main site, and then in dialog.js->get for the dialog.
       */
      renderer.render("#rp_info", "rp_info", {
        hostname: options.hostname,
        siteName: options.siteName,
        siteLogo: options.siteLogo,
        privacyURL: options.privacyURL,
        tosURL: options.tosURL
      });

      sc.start.call(this, options);
    }