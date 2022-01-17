function () {
      var invalidConvID = "000000000000";
      var validUrlLocationForMessagesList = "/ro-RO/Messages/MessagesList";
      //we have to be logged in for this to work, otherwise we would receive back the LogOn dialog
      $.ajax({
         url: validUrlLocationForMessagesList,
         data: { "conversationId": invalidConvID },
         success: function (data) {
            ok(data.length == 0, "Empty string should be returned (length = 0)");
            ok(data === "", "Empty string should be returned");            
            start();
         },
         error: function (xhr, ajaxOptions, thrownError) {
            ok(false, xhr.responseText);
            start();
         }
      })
   }