function user_data_cached(username){
  if (users_data[username]){
    return users_data[username].privileges;
  }
  return null;
}