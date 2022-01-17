function() {
        var data = $(this).getTemplateData({ textValues: ['assignment_group_id'] });
        groups.push(data.assignment_group_id);
      }