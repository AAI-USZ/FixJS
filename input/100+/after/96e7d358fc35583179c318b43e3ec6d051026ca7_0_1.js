function (t) {
  var msg = {
    "_id": "4ff71172bc148900000010a3",
    "userId": "4f711b377579dbf65e000001",
    "courseId": "4f69021bff338faffa000001",
    "createdByUserId": "4f711b377579dbf65e000001",
    "dateFrom": "2012-06-04",
    "dateTo": "2012-09-30",
    "notes": "Rates do not include tax & are subject to change without notice\\nRental Clubs are available for $30 per set\\nAll major credit cards accepted",
    "updatedAt": "2012-07-06T17:59:08.581Z",
    "periods": [{
      "name": "morning",
      "weekdayWalking": 1500,
      "weekdayCart": 3000,
      "weekendWalking": 2000,
      "weekendCart": 3500,
      "timeFrom": 0,
      "timeTo": 780,
      "_id": "4ff71172bc148900000010a4"
    },
    {
      "timeFrom": 780,
      "name": "twilight",
      "timeTo": 900,
      "weekdayWalking": 1500,
      "weekdayCart": 2500,
      "weekendWalking": 1500,
      "weekendCart": 3000,
      "_id": "4ff7276cbc148900000010f4"
    },
    {
      "timeFrom": 900,
      "name": "super twilight",
      "weekdayWalking": 1200,
      "weekdayCart": 2000,
      "weekendWalking": 1200,
      "weekendCart": 2500,
      "timeTo": 1439,
      "_id": "4ff7276cbc148900000010f3"
    }],
    "holidays": [{
      "country": "US",
      "name": "Flag Day",
      "start": 1339657200000,
      "end": 1339743600000,
      "date": "2012-06-14"
    },
    {
      "country": "US / MX",
      "name": "Father's Day, Día del Padre (Father's Day)",
      "start": 1340262000000,
      "end": 1340348400000,
      "date": "2012-06-21"
    },
    {
      "country": "US",
      "name": "Independence Day",
      "start": 1341385200000,
      "end": 1341471600000,
      "date": "2012-07-04"
    },
    {
      "country": "US",
      "name": "Labor Day",
      "start": 1347001200000,
      "end": 1347087600000,
      "date": "2012-09-07"
    }],
    "weekdaySunday": false,
    "weekdaySaturday": false,
    "weekdayFriday": false,
    "weekdayThursday": true,
    "weekdayWednesday": true,
    "weekdayTuesday": true,
    "weekdayMonday": true
  };
  
  client.put('/json/md5', msg, function (err, req, res, obj) {
    t.ifError(err);
    t.ok(req);
    t.ok(res);
    t.equivalent(obj, {hello: 'md5'});
    t.end();
  });
}