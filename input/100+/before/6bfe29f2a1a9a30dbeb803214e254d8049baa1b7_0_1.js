function (aResultSet) {
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
          }