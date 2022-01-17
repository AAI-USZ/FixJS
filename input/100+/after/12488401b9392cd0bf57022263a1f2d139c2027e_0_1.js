function(data) {
          var jsonObj = data;

          Drupal.behaviors.dynamic_comments.commentsArray.length = 0;

          // fill commentsArray with the objects from the server
          for (var key in jsonObj) {
            Drupal.behaviors.dynamic_comments.commentsArray.push(Drupal.behaviors.dynamic_comments.commentObject.create(jsonObj[key]));
          }

          // erase comments that don't have a counterpart in objects array
          Drupal.behaviors.dynamic_comments.ui.cleanupComments();

          // execute the print method for each comment object, so they display in the UI
          // @TODO: should this be separated from the retrieveData method?
          for (i in Drupal.behaviors.dynamic_comments.commentsArray) {
            // print comments without parents first, to make sure we have them
            // in the DOM when attaching their children
            if (Drupal.behaviors.dynamic_comments.commentsArray[i].parent == 0) {
              Drupal.behaviors.dynamic_comments.commentsArray[i].print();
            }
          }

          // print children since the parents are already in the DOM
          for (i in Drupal.behaviors.dynamic_comments.commentsArray) {
            if (Drupal.behaviors.dynamic_comments.commentsArray[i].parent != 0) {
              Drupal.behaviors.dynamic_comments.commentsArray[i].print();
            }
          }
        }