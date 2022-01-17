function(item){
      users_data[item.username] = item;
      insert_user_into_list(item, '#users-list');
    }