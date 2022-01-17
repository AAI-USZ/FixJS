function(status) {
        equal(false, status, "data throttling returns false status");
        // the previously staged data should we wiped on a throttling response.

        // When the interaction_data next completes, this will be the only data
        // that is pushed.
        model.push({ lang: "bar", secret: "Attack at dawn!!!" });
        model.stageCurrent();

        xhr.useResult("valid");
        model.publishStaged(function(status) {
          equal(true, status, "data successfully posted");
          var request = xhr.getLastRequest('/wsapi/interaction_data'),
              previousSessionsData = JSON.parse(request.data).data;

          equal(previousSessionsData.length, 1, "sending correct result sets");
          equal(previousSessionsData[0].lang, "bar", "correct data sent");
          equal(typeof previousSessionsData[0].secret, "undefined", "non-whitelisted valued stripped");
          start();
        });
      }