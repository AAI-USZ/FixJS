function(status) {
          equal(true, status, "data successfully posted");
          var request = xhr.getLastRequest('/wsapi/interaction_data'),
              previousSessionsData = JSON.parse(request.data).data;

          equal(previousSessionsData.length, 1, "sending correct result sets");
          equal(previousSessionsData[0].lang, "bar", "correct data sent");
          equal(typeof previousSessionsData[0].secret, "undefined", "non-whitelisted valued stripped");
          start();
        }