function (all_items){
    var search_result = [];
    
    if(all_items){
      search_result = data.items;
    }
    else{
      var num = prev_inpt.val().toLowerCase();
      var prev = true;
      if(!num) {
        num = curr_inpt.val().toLowerCase();
        prev = false;
        if(!window.device)      
          location.href = '#/novo/' + num;
      }
      else
        if(!window.device)    
          location.href = '#/antigo/' + num;


      if(num){
        var parts = num.match(/[a-z]+|\d+/ig);
        
        for(var j = 0; j < parts.length; j++)
          if(!isNaN(parts[j])) parts[j] = Number(parts[j]).toString();
        
        num = parts.join('');

        for(var i = 0; i < data.items.length; i++){
          var item_num = prev ? data.items[i].previous_number : data.items[i].current_number;
          
          var parts = item_num.match(/[a-z]+|\d+/ig);
          
          if(parts){
            for(var j = 0; j < parts.length; j++)
              if(!isNaN(parts[j])) parts[j] = Number(parts[j]).toString();
            
            item_num = parts.join('');
          }
          
          if(item_num.toLowerCase() == num)
            search_result.push(data.items[i]);
        }
      }
    }
    
    var active_inpt = prev ? prev_inpt : curr_inpt;
    
    prev_inpt.removeClass('not-found').removeClass('found');
    curr_inpt.removeClass('not-found').removeClass('found');
    scroll.addClass('hidden');

    if(num){
      if(search_result.length == 0) {
        active_inpt.addClass('not-found');
      }
      else {
        active_inpt.addClass('found');
        calculate_button_pos();
        scroll.removeClass('hidden');
      }
    }
    
    render_lines(search_result, container, template_row, num, prev);
  }