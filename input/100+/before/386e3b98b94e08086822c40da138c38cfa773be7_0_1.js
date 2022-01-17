function(callback, section, opt_drop, opt_isComment,
    opt_attachToWrapper) {
  section = section || "";
  var buttonHtml =
      '<a name="hw-button-media" class="hw-button hw-button-media" data-section="' + section + '">+</a>'
    + '<progress value="0" max="100" class="hw-hidden">0%</progress>'
    + '<span class="hw-media-result hw-invisible hw-invisible-transition"></span>';
  if (opt_attachToWrapper) {
    opt_attachToWrapper.innerHTML = buttonHtml;
  } else {
    document.write(buttonHtml);
  }
  var commentSelector = opt_isComment ? '.hw-comment-form ' : '';
  var buttons = hw.$$(commentSelector + '.hw-button-media');
  var button = buttons[buttons.length - 1];
  var progress = button.nextSibling;
  var result = progress.nextSibling;
  var xsrf = hw.$$(commentSelector + 'input[name=_xsrf]')[0].value;

  function displayResponse(good, msg) {
    hw.show(result);
    hw.setClass(result, 'hw-bad', !good);
    result.innerHTML = msg;
    var callback = function() {
      hw.hide(result);
    };
    setTimeout(callback, 3000);
  };

  if (!opt_isComment) {
    var r = new Resumable({
      target: hw.uploadUrl, 
      query: { 'section': encodeURIComponent(section),
               '_xsrf' : encodeURIComponent(xsrf) }
    });
  }

  // Resumable.js isn't supported, fall back on a different method
  if (opt_isComment || !r.support) {
    var iframe = document.createElement('iframe');
    var child = button.parentNode.appendChild(iframe);
    iframe.src = 'about:blank';
    iframe.setAttribute('name', 'hw-media-creator');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '16');
    iframe.setAttribute('class', 'hw-hidden');

    var onUpload = function() {
      Event.stopObserving(iframe, 'load', onUpload, false);

      var doc = iframe.contentWindow.document;
      var body = doc.body;

      var bad = false;
      var json;
      try {
        json = JSON.parse(body.textContent);
      } catch(ex) {
        bad = true;
      }

      if (bad) {
        displayResponse(false, hw.getMsg('error'));
      } else {
        displayResponse(true, hw.getMsg('saved'));
        callback(json);
      }

      fn();
    };

    var fn = function() {
      var doc = iframe.contentWindow.document;
      var body = doc.body;
      body.innerHTML = '<form id="form" method="post" action="'
          + hw.uploadUrl + '" enctype="multipart/form-data">'
          + hw.xsrf
          + '<input id="section" type="hidden" name="section" value="'
          + section + '">'
          + '<input id="file" name="file" type="file" multiple="multiple" onchange="this.form.submit()">'
          + '</form>';

      Event.stopObserving(iframe, 'load', fn, false);
      Event.observe(iframe, 'load', onUpload, false);

      hw.show(button);
      result.innerHTML = "";

      var clickFunc = function() {
        doc.getElementById('section').value =
            button.getAttribute('data-section');
        doc.getElementById('file').click();
        //hw.hide(button);
        hw.show(result);
        result.innerHTML = hw.getMsg('uploading');
      };

      button.onclick = clickFunc;
    };
    Event.observe(iframe, 'load', fn, false);

    return;
  }

  r.assignBrowse(button);

  if (opt_drop) {
    r.assignDrop(document);
    Event.observe(document, 'dragover', function() {
      if (!hw.hasClass('hw-container', 'hw-editing')) {
        return;
      }

      if (!opt_isComment) {
        document.body.scrollTop = 0;
      }
      hw.addClass(document.body, 'hw-dragging-file');
    }, false);
  }

  var resumableObj = null;

  r.on('fileAdded', function(file) {
    resumableObj = file.resumableObj;
    resumableObj.opts.query['section'] = button.getAttribute('data-section');
    file.resumableObj.upload();
    hw.show(progress);
    hw.hide(button);
    hw.hide(result);
    result.innerHTML = "";
    setTimeout(function() {
      hw.removeClass(document.body, 'hw-dragging-file');
    }, 0);
  });
  r.on('fileSuccess', function(file, msg) {
    var json = JSON.parse(msg);
    callback(json);
  });

  r.on('complete', function() {
    resumableObj.files = [];
    hw.show(button);
    hw.hide(progress);
    progress.setAttribute('value', '0');
    progress.innerHTML = '0%';
    displayResponse(true, hw.getMsg('saved'));
  });
  r.on('error', function(message, file) {
    resumableObj.files = [];
    hw.show(button);
    hw.hide(progress);
    progress.setAttribute('value', '0');
    progress.innerHTML = '0%';
    displayResponse(false, hw.getMsg('error'));
  });
  r.on('progress', function() {
    if (!resumableObj) {
      return;
    }

    var percent = resumableObj.progress() * 100;
    progress.setAttribute('value', percent);
    progress.innerHTML = percent + '%';
  });
}