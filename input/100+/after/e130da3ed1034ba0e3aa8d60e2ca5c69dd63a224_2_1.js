function () {
    it('should async preload everything correctly', function () {
  
      var i = 0
      , timezoneJS
      , sampleTz;
      runs(function () {
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
      });
  
      waitsFor(function () {
        return i > 0;
      }, 'zones should be loaded', 10000);
      // todo: bad things happen if this times out when running jasmine in the browser
      runs(function () {
        expect(timezoneJS.timezone.loadingScheme).toEqual(timezoneJS.timezone.loadingSchemes.PRELOAD_ALL);
  
        expect(i).toEqual(timezoneJS.timezone.zoneFiles.length);
        expect(sampleTz).toBeDefined();
        expect(sampleTz.tzAbbr).toEqual('ICT');
  
      });
    });
  }