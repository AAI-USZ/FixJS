function() {

    var version = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer') {

      var ua = navigator.userAgent;

      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

      if (re.exec(ua) != null)

        version = parseFloat(RegExp.$1);

    }

    return version;

  }