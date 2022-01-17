function () {
   module("MessagesController")   
   asyncTest("Messages/MessagesList_validConvID_dataIsReturnedWithRequiredFields", 9, function () {
      var validConvID = "442033221134-442033221134";
      var validUrlLocationForMessagesList = "/ro-RO/Messages/MessagesList";
      //we have to be logged in for this to work, otherwise we would receive back the LogOn dialog
      $.ajax({         
         url: validUrlLocationForMessagesList,
         data: { "conversationId": validConvID },
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
   });
   asyncTest("Messages/MessagesList_invalidConvID_noDataIsReturned",2, function () {
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
   });
   asyncTest("Messages/ConversationsList_widestOptionsPossible_dataIsReturned",7, function () {
      var filterOptions = {};
      filterOptions["onlyFavorites"] = false;
      filterOptions["tags"] = [];
      filterOptions["workingPointsNumbers"] = [];
      filterOptions["startDate"] = null;
      filterOptions["endDate"] = null;
      filterOptions["onlyUnread"] = false;
      filterOptions["skip"] = 0;
      filterOptions["top"] = 10;
      filterOptions["requestIndex"] = 0

      var validUrlLocationForConversationsList = "/ro-RO/Messages/ConversationsList";
      $.ajax({
         url: validUrlLocationForConversationsList,
         data: filterOptions,
         success: function (data) {
            ok(data.length >= 1, "Valid data should be returned");
            var conv = data[0];
            ok($(conv).attr("TimeReceived") != undefined, "TimeReceived should be present");
            ok($(conv).attr("Read") != undefined, "Read should be present");
            ok($(conv).attr("Text") != undefined, "Text should be present");
            ok($(conv).attr("From") != undefined, "From should be present");
            ok($(conv).attr("To") != undefined, "To should be present");
            ok($(conv).attr("Starred") != undefined, "Starred should be present");
            start();
         },
         error: function (xhr, ajaxOptions, thrownError) {
            ok(false, xhr.responseText);
            start();
         }
      })
   });
}