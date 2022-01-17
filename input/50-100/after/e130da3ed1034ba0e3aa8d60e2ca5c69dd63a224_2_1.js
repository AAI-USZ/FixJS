function () {
        timezoneJS = TestUtils.getTimezoneJS({
          _loadingScheme: "PRELOAD_ALL",
          async: true,
          callback: function () {
            //Make sure more than 1 zone is loaded
            for (var k in timezoneJS.timezone.loadedZones) {
              i++;
            }
            sampleTz = timezoneJS.timezone.getTzInfo(new Date(), 'Asia/Bangkok');
          }
        });
      }