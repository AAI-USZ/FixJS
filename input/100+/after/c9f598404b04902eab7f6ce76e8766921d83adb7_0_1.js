function(showAdditional) {
      var log = this.logger;
      var toJSON = this.toJSON;
      var i, elem, ctx, host, hosts = this.hostContainer;
      var browser = this.browser;
      var stub, hbox, image, label, src;

      if ('undefined' === typeof showAdditional) {
        showAdditional = 'yes' === pref.getCharPref('downbar.cloud.hosts.additional');
      }

      if (hosts.getElementsByTagName('menuitem').length > 0) {
        /* repopulate, just show/hide additional hosts according to the latest setting */
        elem = hosts.getElementsByClassName('additional');
        for (i = 0; i < elem.length; elem[i++].hidden = !showAdditional);
      } else {
        /* menuitem stub */
        stub = document.createElement('menuitem');
        hbox = document.createElement('hbox');
        image = document.createElement('image');
        label = document.createElement('label');
        hbox.setAttribute('class', 'item-box');
        hbox.setAttribute('align', 'center');
        image.setAttribute('class', 'item-image');
        label.setAttribute('class', 'item-label');
        stub.appendChild(hbox);
        hbox.appendChild(image);
        hbox.appendChild(label);

        // ==============================================
        var combined = [];

        /* construct hosts */
        for (ctx in browser.original) {
          /* ignore link type hosts (just dropdo) as they only save remote files */
          if ('link' !== ctx) {
            for (host in browser.original[ctx]) {
              combined.push({"host": host,
                             labelValue:browser.original[ctx][host],
                             source:"original"});
            }
          }
        }

        for (ctx in browser.additional) {
          for (host in browser.additional[ctx]) {
            combined.push({"host": host,
                           labelValue: browser.additional[ctx][host],
                           source: "additional"});
          }
        }

        combined.sort(function(a, b) {
          var ahost = a.host.toLowerCase(), bhost = b.host.toLowerCase();
          if (ahost < bhost) return -1;
          if (bhost < ahost) return 1;
          return 0;
        });

        for (var i = 0; i < combined.length; i++) {
          var entry = combined[i];
          //toJSON(entry);
          src = 'chrome://downbar/skin/cloud/icon/' + entry.host + '.png';
          elem = stub.cloneNode(true);
          image = elem.getElementsByClassName('item-image')[0];
          label = elem.getElementsByClassName('item-label')[0];
          image.setAttribute('src', src);
          label.setAttribute('value', entry.labelValue);
          elem.setAttribute('label', entry.labelValue);
          elem.setAttribute('value', entry.host);
          elem.setAttribute('class', 'additional menuitem-iconic');
          elem.setAttribute('src', src);
          elem.context = ctx;
          elem.hidden = (entry.source === "additional") && !showAdditional;
          hosts.appendChild(elem);
        }
      }
    }