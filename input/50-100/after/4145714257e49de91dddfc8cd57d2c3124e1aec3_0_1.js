function() {

    /* label placeholders */
    $("input, textarea").placeholder();

    /* Avatars */
    $(this.avatars.selector).error(this.avatars.fallback);

    /* facebox */
    $.facebox.settings.closeImage = '/assets/facebox/closelabel.png';
    $.facebox.settings.loadingImage = '/assets/facebox/loading.gif';
    $.facebox.settings.opacity = 0.9;

    $('a[rel*=facebox]').facebox();

  }