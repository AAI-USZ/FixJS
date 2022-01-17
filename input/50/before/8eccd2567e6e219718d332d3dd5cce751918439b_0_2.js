function(data) {
        if(data['display_name'] == true &&
           data['load_balancer_size'] == true) {
          bt_create_load_balancer.disabledButton(1, false);
        } else {
          bt_create_load_balancer.disabledButton(1, true);
        }
      }