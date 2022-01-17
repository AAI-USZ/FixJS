function () {
      var validUrlForWpList = "/ro-Ro/Messages/WorkingPointsPerUser";
      $.ajax({
         url: validUrlForWpList,
         success: function (data) {
            ok(data.length >= 1, "At least one wp should be returned");
            var wp = data[0];
            ok($(wp).attr("TelNumber") != undefined, "TelNumber should be present");
            ok($(wp).attr("Name") != undefined, "Name should be present");
            ok($(wp).attr("Description") != undefined, "Description should be present");
            start();
         },
         error: function (xhr, ajaxOptions, thrownError) {
            ok(false, xhr.responseText);
            start();
         }
      });
   }