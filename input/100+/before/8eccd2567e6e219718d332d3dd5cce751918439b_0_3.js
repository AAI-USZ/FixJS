function(){
      var self = this;
      var loading_image = DcmgrGUI.Util.getLoadingImage('boxes');
      $(this).find('#select_load_balancer').empty().html(loading_image);

      var request = new DcmgrGUI.Request;
      var is_ready = {
        'display_name': false,
        'load_balancer_size': false
      }

      var ready = function(data) {
        if(data['display_name'] == true &&
           data['load_balancer_size'] == true) {
          bt_create_load_balancer.disabledButton(1, false);
        } else {
          bt_create_load_balancer.disabledButton(1, true);
        }
      }

      $(this).find('#display_name').keyup(function(){
       if( $(this).val() ) {
         is_ready['display_name'] = true;
         ready(is_ready);
       } else {
         is_ready['display_name'] = false;
         ready(is_ready);
       }
      });

      $(this).find('#load_balancer_size').keyup(function(){
       if( $(this).val() ) {
         is_ready['load_balancer_size'] = true;
         ready(is_ready);
       } else {
         is_ready['load_balancer_size'] = false;
         ready(is_ready);
       }
      });

      request.get({
        "url": '/load_balancers/show_load_balancers.json',
        success: function(json,status){
          console.log(json);
          var select_html = '<select id="load_balancer" name="load_balancer"></select>';
          $(self).find('#select_load_balancer').empty().html(select_html);
          var results = json.load_balancer.results;
          var size = results.length;
          var select_load_balancer = $(self).find('#load_balancer');
          for (var i=0; i < size ; i++) {
            var uuid = results[i].result.uuid;
            var html = '<option value="'+ uuid +'">'+uuid+'</option>';
            select_load_balancer.append(html);
          }

          var params = { 'button': bt_create_load_balancer, 'element_id': 1 };
        }
      });
    }