function() {

    /* label placeholders */
    $("input, textarea").placeholder();

    /* Avatars */
    $(this.avatars.selector).error(this.avatars.fallback);

    /* facebox */
    $.facebox.settings.closeImage = '/assets/images/facebox/closelabel.png';
    $.facebox.settings.loadingImage = '/assets/images/facebox/loading.gif';
    $.facebox.settings.opacity = 0.75;

    $('a[rel*=facebox]').facebox();

  }