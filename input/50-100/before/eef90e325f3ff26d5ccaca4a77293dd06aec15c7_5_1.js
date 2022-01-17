function(body) {
        eCheck.namedValue('body', body.bodyText);
        if (body.attachments && body.attachments.length) {
          for (var i = 0; i < body.attachments.length; i++) {
            eCheck.expect_namedValue('attachment',
                                     body.attachments[i].filename);
          }
        }
      }