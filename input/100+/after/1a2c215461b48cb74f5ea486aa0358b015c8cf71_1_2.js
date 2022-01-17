function(status) {
        equal(false, status, "data throttling returns false status");
        // the previously staged data should we wiped on a throttling response.

        // When the interaction_data next completes, this will be the only data
        // that is pushed.
        var now = new Date().getTime();

        model.push({
          event_stream: [],
          sample_rate: 1,
          timestamp: now,
          local_timestamp: now,
          lang: "bar",
          secret: "Attack at dawn!!!"
        });
        model.stageCurrent();

        xhr.useResult("valid");
        model.publishStaged(function(status) {
          equal(true, status, "data successfully posted");
          var request = xhr.getLastRequest('/wsapi/interaction_data'),
              previousSessionsData = JSON.parse(request.data).data;

          equal(previousSessionsData.length, 1, "sending correct result sets");

          var mostRecentSessionData = previousSessionsData[0];
          testObjectValuesEqual(mostRecentSessionData, {
            event_stream: [],
            sample_rate: 1,
            timestamp: now,
            lang: "bar"
          });

          equal(typeof mostRecentSessionData.local_timestamp, "undefined", "non-whitelisted valued stripped");
          equal(typeof mostRecentSessionData.secret, "undefined", "non-whitelisted valued stripped");
          start();
        });
      }