function(response) {
            $('#' + projectCssId).replaceWith(response);
            if ($(response).hasClass('building')) {
              showAsBuilding('#' + projectCssId);
              $('#' + projectCssId).fadeTo(1000, 0.5).fadeTo(1000, 1);
            }
          }