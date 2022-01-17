function() {
  var factMananger, is_site_disabled;

  if (window.frameElement !== null) {
    console.log('Is Iframe');
    return;
  }

  self.port.emit('getEnabled');

  self.on('message', function(msg) {
    var script;
    if (msg.isEnabled != null) {
      if (msg.isEnabled === true) {
        return factMananger.showFact();
      } else {
        return factMananger.hideFact();
      }
    } else if (msg.fact != null) {
      return factMananger.showFact(msg.fact);
    } else if (msg.css != null) {
      script = $('<style type="text/css"></style>');
      script.html(msg.css);
      return $(script).appendTo($('head:first'));
    }
  });

  is_site_disabled = function() {
    var ignoredTags, selectors;
    ignoredTags = ['navbar.navbar-fixed-top', '#blueBar.fixed_elem', '#onegoogbar', '#gb', '#mngb', '.topbar .global-nav', '#navBar.fixed'];
    selectors = ignoredTags.join(', ');
    if ($(selectors).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  factMananger = {
    shareURL: "http://simple-planet-5852.herokuapp.com/share",
    hasFact: function() {
      return $('#draco-interesting-facts123').length > 0;
    },
    createNewFact: function(fact) {
      var $factsBar;
      $factsBar = $('<table id="draco-interesting-facts123">\n<tbody>\n  <tr>\n    <td id="draco-interesting-facts-share">\n      <iframe src=""></iframe>\n    </td>\n    <td id="draco-interesting-facts-fact123">\n    </td>\n    <td id="draco-interesting-facts-close123">\n      &times;\n    </td>\n  </tr>\n</tbody>\n</table>');
      console.log($factsBar);
      $factsBar.find('#draco-interesting-facts-fact123').html(fact.content);
      $factsBar.find('#draco-interesting-facts-share iframe').attr("src", "" + this.shareURL + "/" + fact.id);
      window.addEventListener('message', this.handleShareMessage, false);
      $factsBar.find('#draco-interesting-facts-close123').click(function() {
        return $factsBar.remove();
      });
      $('html:first').prepend($factsBar);
      $factsBar.find('#draco-interesting-facts-share').tooltip({
        title: "Share Fact",
        placement: 'right'
      });
      return $factsBar;
    },
    showFact: function(value) {
      if (value == null) {
        value = null;
      }
      if (this.hasFact()) {
        return $('#draco-interesting-facts123').show();
      } else if (value !== null) {
        if (is_site_disabled()) {
          return;
        }
        return this.createNewFact(value);
      } else {
        return self.port.emit('getFact');
      }
    },
    hideFact: function() {
      return $('#draco-interesting-facts123').hide();
    },
    handleShareMessage: function(event) {
      console.log(event);
      if ((event.data != null) && event.data === "Awesome Fact Shared") {
        $('#draco-interesting-facts-share').addClass("disabled").tooltip('disable');
        return noty({
          text: 'Current Fact Shared :)',
          layout: 'topLeft',
          type: 'success',
          theme: 'noty_theme_facebook'
        });
      } else if ((event.data != null) && event.data === "Awesome Fact Failed") {
        return this.noty({
          text: 'Sharing Failed :(',
          layout: 'topLeft',
          type: 'error',
          theme: 'noty_theme_facebook'
        });
      }
    }
  };

  $(function() {
    if (is_site_disabled()) {
      return $('#draco-interesting-facts123').remove();
    }
  });

}