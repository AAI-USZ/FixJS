function user_type_cached(username){
  if (users_data[username]){
    return users_data[username].limited || false;
  }
  return null;
}