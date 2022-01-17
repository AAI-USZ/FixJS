function(){
      var all_ok = true
      if($('#backer_credits').val() == "false"){
        if(!ok('#user_full_name'))
          all_ok = false
        if(!cpf_ok())
          all_ok = false
        if(!email_ok())
          all_ok = false
        if(!zip_code_ok())
          all_ok = false
        if(!ok('#user_address_street'))
          all_ok = false
        if(!ok('#user_address_number'))
          all_ok = false
        if(!ok('#user_address_neighbourhood'))
          all_ok = false
        if(!ok('#user_address_city'))
          all_ok = false
        if(!ok('#user_address_state'))
          all_ok = false
        if(!phone_number_ok())
          all_ok = false
      }
      if(!accepted_terms())
        all_ok = false
      if(all_ok){
        $('#user_submit').attr('disabled', false)
        if($('#back_with_credits').length < 1) {
          $('#payment.hide').show();
        }
      } else {
        $('#payment.hide').hide();
        if($('#back_with_credits').length < 1) {
          $('#user_submit').attr('disabled', true)
        }
      }
    }