function() {
    if (!userSettings.useDialogs) {
      return true;
    }
    var $this = $(this);
    var href = $this.attr('href');
    if (!/[&?]dialog=1/.test(href)) {
      // Dialog pages know not to display a title if $_GET['dialog'] is set
      href += (/\?/.test(href) ? '&' : '?') + 'dialog=1';
    }
    var dims = $this.attr('rel').split(':');
    showDialog(href, $this.text(), dims[0], dims[1]);
    return false;
  }