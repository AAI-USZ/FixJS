function(repos) {

        var i = 0;

        for (; i < repos.length; i++) {

          var html = reposItemTpl(repos[i]);

          reposContainer.append(html);

        }

        checkboxState = getLocalStorageState();

        var checkboxes = $("input[type='checkbox']");

        var i = 0;

        for (; i < checkboxes.length; i++) {

          var identifier = $( checkboxes[i] ).attr('value');

          checkboxes[i].checked = checkboxState[identifier];

          if (checkboxState[identifier] == true) {

            $('.' + identifier).removeClass('invisible').addClass('visible-cell');

          }

        }

      }