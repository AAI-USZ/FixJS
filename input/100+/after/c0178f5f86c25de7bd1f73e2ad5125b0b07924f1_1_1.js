function get_items(feed, toplevel_items, sub_items, items_handler) {
  var items = [];
  var items_index = {};

  var toplevel_statement = connection.createStatement("SELECT * FROM items WHERE feed=:feed AND in_reply_to IS NULL ORDER BY date DESC LIMIT :limit");
  toplevel_statement.params.feed = feed;
  toplevel_statement.params.limit = toplevel_items;

  var sub_statement = connection.createStatement("SELECT * FROM items WHERE feed=:feed AND in_reply_to=:in_reply_to ORDER BY date ASC LIMIT :limit");
  var sub_params = sub_statement.newBindingParamsArray();
  toplevel_statement.executeAsync({
    handleResult: function(aResultSet) {

      var row;
      while (row = aResultSet.getNextRow()) {
        var toplevel_item = {};

        toplevel_item["id"] = row.getResultByName("id");
        toplevel_item["author"] = row.getResultByName("author_name");
        toplevel_item["avatar"] = row.getResultByName("avatar_url");
        toplevel_item["date"] = row.getResultByName("date");
        toplevel_item["content"] = row.getResultByName("content");
        toplevel_item["sub_items"] = [];
        toplevel_item["sub_items_complete"] = true; // default value

        items.push(toplevel_item);
        items_index[toplevel_item["id"]] = toplevel_item;

        var row_params = sub_params.newBindingParams();
        row_params.bindByName("feed", feed);
        row_params.bindByName("in_reply_to", toplevel_item["id"]);
        row_params.bindByName("limit", sub_items+1); // one more than requested to check whether there are more comments
        sub_params.addParams(row_params);
      }

    },

    handleError: function(aError) {
      console.log("Error: " + aError.message);
    },

    handleCompletion: function(aReason) {
      if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
        console.log("Query canceled or aborted!");

      if (sub_params.length) { // TODO: swap out to other function
        sub_statement.bindParameters(sub_params);
        sub_statement.executeAsync({
          handleResult: function (aResultSet) {
            var row;
            while (row = aResultSet.getNextRow()) {
              var sub_item = {};

              sub_item["id"] = row.getResultByName("id");
              sub_item["author"] = row.getResultByName("author_name");
              sub_item["avatar"] = row.getResultByName("avatar_url");
              sub_item["content"] = row.getResultByName("content");

              toplevel_item = items_index[row.getResultByName("in_reply_to")];

              if (toplevel_item["sub_items"].length >= sub_items) {
                toplevel_item["sub_items_complete"] = false;
              }
              else {
                toplevel_item["sub_items"].push(sub_item);
              }
            }
          },
          handleError: function(){},
          handleCompletion: function(){
            items_handler(items);
          }
        });
      }

    }
  });
}