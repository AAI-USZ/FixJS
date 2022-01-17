function(response) {
            $projectEl.replaceWith(response);
            if ($(response).hasClass('building')) {
              showAsBuilding($projectEl);
              $projectEl.fadeTo(1000, 0.5).fadeTo(1000, 1);
            }
          }