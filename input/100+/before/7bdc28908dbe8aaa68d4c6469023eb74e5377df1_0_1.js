function (e, data) {
//      $('.upload-list').hide();
//      enableUpload(false);
      // TODO: reset UI and clear tr's

      var x = JSON.parse(data.jqXHR.responseText)[0]
      var template = $('#template-mason-brick').html();
      var h = Mustache.to_html(template, x);
      $('#gallery').prepend(h).masonry('reload');
    }