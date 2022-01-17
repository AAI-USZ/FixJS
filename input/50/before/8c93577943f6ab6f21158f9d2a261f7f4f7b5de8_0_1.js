function(item){
      users_data[item.username] = item.privileges;
      insert_user_into_list(item, '#users-list');
    }