function(){
        
        console.log('init login controller.');

        this.control({
          '#btnLogin':{
							'tap':function(item){

								//lstore.setData('{email:"test",password:"123"}');
								
								this.loginMemberPortal();

							 
          	}
					},
					'#btnLoginRegister':{
							'tap':function(item){
								
               this.mixins.mixHome.changeView('RegisterVW');
							 
          	}
					},
					'#btnLoginForgotPassword':{
							'tap':function(item){
							
               this.mixins.mixHome.changeView('ForgotPasswordVW');
							 
          	}
					},
					'#btnRegister':{
							'tap':function(item){
							 this.registerCustomer();
							 
          	}
					},
					'#btnForgotPassword':{
						'tap':function(item){
							this.forgotPassword();
						}
					}

						
        }); //end control

    }