function () {

        if (dropDown.isOpened())

          dropDown.closeUp();

        else {

          dropDown.dropDown();

          if (!dropDown._cachingAllowed)

            dropDown._clearSuggestions();

          dropDown._checkAdditionalPageNeeded(!dropDown._cachingAllowed);

        }



        // reacquire focus when pressing the dropper button

        if (!dropDown._ddf_focused) {

          if (dropDown._field.value != dropDown._promptText) {

            dropDown.focus();

          }

          // focus is already lost on Mozilla and Opera

        } else {

          dropDown._reacquireFocus = true;

          // field is still in focus under IE

        }

      }