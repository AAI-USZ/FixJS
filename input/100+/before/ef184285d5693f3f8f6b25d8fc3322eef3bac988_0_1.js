function(i, el) {
        var $el = $(el),
            projectCssId = $el.attr('id'),
            project_id = $el.data('id'),
            project_type = $el.hasClass('aggregate') ? 'aggregate_project' : 'project';

        $.ajax({
          url: '/'+project_type+'s/'+project_id+'/status',
          data: {
            tiles_count: tilesCount
          },
          dataType: 'html',
          success: function(response) {
            $('#' + projectCssId).replaceWith(response);
            if ($(response).hasClass('building')) {
              showAsBuilding('#' + projectCssId);
              $('#' + projectCssId).fadeTo(1000, 0.5).fadeTo(1000, 1);
            }
          },
          error: function() {
            $el.addClass('server-unreachable');
          }
        });
      }