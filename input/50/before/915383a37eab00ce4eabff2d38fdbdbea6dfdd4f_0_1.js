function(csrftoken) {
        sendContent.csrfmiddlewaretoken = csrftoken;
        return request(self.UPLOAD_URL, {
          sendContent : sendContent
        });
      }