function order_up(id){
    post_to_url('requests/new', {id: id, user: user_id}, "get");
}