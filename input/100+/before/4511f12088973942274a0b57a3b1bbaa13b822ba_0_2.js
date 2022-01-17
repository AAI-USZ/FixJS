function () {
  var baseHref = $('base').attr('href');
  this.panel = $('<div style="position: fixed; top: 10px; right: 10px; height: 10em; zIndex: 10001">');
  this.panel[0].annotateHide = true;
  var innerDiv = $('<div>').attr('style', styles.base + styles.border + 'padding: 6px 3px 6px 3px;');
  this.annotateButton = $('<span title="Make annotations on the page">Annotate</span>').attr('style', styles.bigButton);
  innerDiv.append(this.annotateButton);
  this.viewButton = $('<span title="View the page (without adding annotations)">View</span>').attr('style', styles.bigButton);
  innerDiv.append(this.viewButton);
  this.hideButton = $('<span title="Hide all the annotations">Hide</span>').attr('style', styles.bigButton);
  var info = $('<div style="padding-top: 4px"></div>');
  innerDiv.append(info);
  this.infoButton = $('<div style="cursor: pointer">Info: &#9656;</span>');
  info.append(this.infoButton);
  this.infoDetails = $('<div></div>').hide();
  info.append(this.infoDetails);
  this.loginStatus = $('<span></span>');
  info.append(this.loginStatus);
  info.append($('<br>'));
  info.append('URL: ');
  info.append($('<a target="_blank"></a>').attr('style', styles.link).text(baseHref).attr('href', baseHref));
  this.shareText = $('<input type="text">').hide();
  info.append(this.shareText);
  $('body').append(innerDiv);

  this.annotateButton.click(function () {
    self.setView('annotate');
  });
  this.viewButton.click(function () {
    self.setView('view');
  });
  this.hideButton.click(function () {
    if (self.viewingState == 'hide') {
      self.setView('view');
    } else {
      self.setView('hide');
    }
  });
  this.infoButton.click(function (ev) {
    if (self.infoDetails.is(':visible')) {
      self.infoDetails.hide();
      self.infoButton.html('Info: &#9656;');
    } else {
      self.infoDetails.show();
      self.infoButton.html('Info: &#9662;');
    }
    return false;
  });
  /*
  this.shareButton.click(function (ev) {
    self.shareButton.text('Share...');
    self.getShareLink(function (data) {
      if (! data) {
        self.shareButton.innerHTML = 'Share failed';
        return;
      }
      self.shareButton.hide();
      self.shareText.show().val(data.url).focus().select();
      if (window.clipboardData) {
        window.clipboardData.setData('text', self.shareText.value);
      }
      self.shareText.on('blur', function () {
        self.shareText.hide();
        self.shareButton.text('Share').show();
      });
    });
    return false;
  }); */
  this.clickListener = this.clickEvent.bind(this);
  this.changeListener = this.changeEvent.bind(this);
  this.annotationForm = new AnnotationForm(this);
  this.setView('annotate');
}