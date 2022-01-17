function(e) {
    e.preventDefault();
    var elem_class = $(this).removeClass('active').attr('class');
    if(elem_class != 'all' && elem_class != 'clearselection') {
      if(!e.ctrlKey) {
        resetSelected();
        $(this).parents('ul').find('a').removeClass('active');
      }
      else {
        if($('#embedly-service-select .all').hasClass('active') || $('#embedly-service-select .clearselection').hasClass('active')) {
          $('#embedly-service-select .clearselection').add($('#embedly-service-select .all')).removeClass('active');
        }
      }
    }
    else {
      $(this).parents('ul').find('a').removeClass('active');
    }
    switch(elem_class) {
      case 'all':
        allCheckboxes.attr('checked', 'checked').trigger('change');
        listClone.find('li').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');
        serviceList.find('li').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');      
      break;
      case 'clearselection':
        resetSelected();
      break;
      case 'videos':
        videoCheckboxes.attr('checked', 'checked').trigger('change');
        listClone.find('li.video').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');
        serviceList.find('li.video').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');
      break;
      case 'photos':
        photoCheckboxes.attr('checked', 'checked').trigger('change');
        listClone.find('li.photo').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');
        serviceList.find('li.photo').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');      
      break;
      case 'audio':
        audioCheckboxes.attr('checked', 'checked').trigger('change');
        listClone.find('li.audio').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');
        serviceList.find('li.audio').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');      
      break;
      case 'rich':
        richCheckboxes.attr('checked', 'checked').trigger('change');
        listClone.find('li.rich').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');
        serviceList.find('li.rich').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');      
      break;
      case 'products':
        productCheckboxes.attr('checked', 'checked').trigger('change');
        listClone.find('li.product').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');
        serviceList.find('li.product').addClass('service-selected').find('input[type=checkbox]').attr('checked', 'checked');      
      break;
    }
    $(this).addClass('active');
  }