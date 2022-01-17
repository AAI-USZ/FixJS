function(comment) {

      // json string to object
      var commentObj = comment;

      // get position for icon placement
      if (commentObj.position != 'undefined') {
        console.log(commentObj.position);
        commentObj.position = JSON.parse(commentObj.position);
        console.log(commentObj.position.top);
      }
      else {
        commentObj.position = {
          top: 0,
          left: 0
        };
      }

      // flag comment if resolved
      var resolvedClass = '';
      if (commentObj.status == 1) {
        resolvedClass = 'resolved';
      }

      // check for child comments
      var childClasses = '';
      if (commentObj.parent != 0) {
        childClasses = 'nested-child child-of-' + commentObj.parent;
      }

      // create sidebar comment html
      commentObj.html = Drupal.theme('dynamicCommentsCommentObjHTML', commentObj, childClasses, resolvedClass);

      // create icon html
      commentObj.icon = Drupal.theme('dynamicCommentsCommentObjIcon', commentObj);

      // method for the comment to print itself in the UI
      commentObj.print = function() {
        // attempt to stop creation of multiple cloned objects
        // @TODO: does this work? is it needed?
        if (!document.getElementById(commentObj.cid)) {
          if (commentObj.parent == 0) {
            $('#dynamic-comments-sidebar .dynamic-comments-sidebar-inner').prepend(commentObj.html);
            $('.dynamic-comments-icons').prepend(commentObj.icon);
          }
          else {
            $('#dynamic-comments-sidebar .dynamic-comments-sidebar-inner .comment-' + commentObj.parent).after(commentObj.html);
          }


        }
        else {
        // @TODO: this is screwing up the objects after they are first created on load!!!
        //commentObj = null;
        }
      }

      commentObj.erase = function() {
        $('.comment-' + commentObj.cid).remove();
        $('.dynamic-comments-comment-icon#' + commentObj.cid).remove();
      }
      commentObj.update = function() {
        $('.comment-' + commentObj.cid).replaceWith(commentObj.html);
      }
      return commentObj;

    }