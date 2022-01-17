function lists_toggle_filter(subject,id) {
    alreadySelected = $('#row_'+subject+id).hasClass('fhighlighted');
    $('#row_'+subject+id).removeClass('fhighlighted');
    if (alreadySelected) {
        switch (subject) {
        case 'user':
          filterUsers.splice(filterUsers.indexOf(id),1);
        break;
        case 'customer':
          filterCustomers.splice(filterCustomers.indexOf(id),1);
          lists_customer_prefilter(0,'filter');
        break;
        case 'project':
          filterProjects.splice(filterProjects.indexOf(id),1);
        break;
        case 'activity':
          filterActivities.splice(filterActivities.indexOf(id),1);
        break;
      }
    }
    else
    {
      $('#row_'+subject+id).addClass('fhighlighted');
      switch (subject) {
        case 'user':
          filterUsers.push(id);
        break;
        case 'customer':
          filterCustomers.push(id);
          lists_customer_prefilter(id,'filter');
        break;
        case 'project':
          filterProjects.push(id);
        break;
        case 'activity':
          filterActivities.push(id);
        break;
      }
    }
}