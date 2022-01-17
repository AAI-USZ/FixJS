function() {
      var multiple = files.length > 1,
        ts = new Date().getTime(),
        content = '<span>' + (multiple ? ref.get_label('uploadingmany') : files[0].name) + '</span>';

      // add to attachments list
      if (!ref.add2attachment_list(ts, { name:'', html:content, classname:'uploading', complete:false }))
        ref.file_upload_id = ref.set_busy(true, 'uploading');

      // complete multipart content and post request
      multipart += dashdash + boundary + dashdash + crlf;

      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: ref.url(ref.env.filedrop.action||'upload', { _id:ref.env.compose_id||ref.env.cid||'', _uploadid:ts, _remote:1 }),
        contentType: formdata ? false : 'multipart/form-data; boundary=' + boundary,
        processData: false,
        data: formdata || multipart,
        headers: {'X-Roundcube-Request': ref.env.request_token},
        beforeSend: function(xhr, s) { if (!formdata && xhr.sendAsBinary) xhr.send = xhr.sendAsBinary; },
        success: function(data){ ref.http_response(data); },
        error: function(o, status, err) { ref.http_error(o, status, err, null, 'attachment'); }
      });
    }