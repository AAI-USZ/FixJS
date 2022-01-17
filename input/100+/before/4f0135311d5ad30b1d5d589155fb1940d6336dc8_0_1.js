function(skipRenderEvent) {
    if (!this.isValid()) {
      this.fire('render');
      return;
    }

    var
      contentStr = '',
      post = '',
      pre = '',
      classStr = '',
      share = FB.Intl.tx('sh:share-button'),
      wrapperClass = '';

    switch (this._type) {
    case 'icon':
    case 'icon_link':
      classStr = 'fb_button_simple';
      contentStr = (
        '<span class="fb_button_text">' +
          (this._type == 'icon_link' ? share : '&nbsp;') +
        '</span>'
      );
      skipRenderEvent = false;
      break;
    case 'link':
      contentStr = FB.Intl.tx('cs:share-on-facebook');
      skipRenderEvent = false;
      break;
    case 'button':
      contentStr = '<span class="fb_button_text">' + share +  '</span>';
      classStr = 'fb_button fb_button_small';
      skipRenderEvent = false;
      break;
    case 'button_count':
      contentStr = '<span class="fb_button_text">' + share +  '</span>';
      post = (
        '<span class="fb_share_count_nub_right">&nbsp;</span>' +
        '<span class="fb_share_count fb_share_count_right">'+
          this._getCounterMarkup() +
        '</span>'
      );
      classStr = 'fb_button fb_button_small';
      break;
    default:
      // box count
      contentStr = '<span class="fb_button_text">' + share +  '</span>';
      pre = (
        '<span class="fb_share_count_nub_top">&nbsp;</span>' +
        '<span class="fb_share_count fb_share_count_top">' +
          this._getCounterMarkup() +
        '</span>'
      );
      classStr = 'fb_button fb_button_small';
      wrapperClass = 'fb_share_count_wrapper';
    }
    this.dom.innerHTML = FB.String.format(
      '<span class="{0}">{4}<a href="{1}" class="{2}" ' +
      'onclick=\'FB.ui({6});return false;\'' +
      'target="_blank">{3}</a>{5}</span>',
      wrapperClass,
      this._href,
      classStr,
      contentStr,
      pre,
      post,
      FB.JSON.stringify({ method: 'stream.share', u: this._href })
    );

    if (!skipRenderEvent) {
      this.fire('render');
    }
  }