function () {
      var validConvID = "442033221134-442033221134";
      var validUrlLocationForMessagesList = "/ro-RO/Messages/MessagesList";
      //we have to be logged in for this to work, otherwise we would receive back the LogOn dialog
      $.ajax({
         url: validUrlLocationForMessagesList,
         data: { "CONVERSATIONID": validConvID },
         success: function (data) {
            ok(data.length >= 1, "Some valid data should be returned");
            var msg = data[0];
            ok($(msg).attr("Id") != undefined, "Id should be present");
            ok($(msg).attr("From") != undefined, "From should be present");
            ok($(msg).attr("Text") != undefined, "Text should be present");
            ok($(msg).attr("TimeReceived") != undefined, "TimeReceived should be present");
            ok($(msg).attr("ConvID") != undefined, "Conversation ID should be present");

            ok($(msg).attr("Direction") == undefined, "Direction should not be present");

            ok($(msg).attr("Read") != undefined, "Read should be present");
            ok($(msg).attr("Starred") != undefined, "Starred should be present");
            start();
         },
         error: function (xhr, ajaxOptions, thrownError) {
            ok(false, xhr.responseText);
            start();
         }
      })
   }