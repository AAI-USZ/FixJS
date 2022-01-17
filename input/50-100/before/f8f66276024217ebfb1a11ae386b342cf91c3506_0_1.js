function() {
        var data = $(this).getTemplateData({ textValues: ['assignment_group_id'] });
        if($(this)[0] != $drag[0]) {
          groups.push(data.assignment_group_id);
        }
      }