function(step) {
						    if (step == 0) {
						      div.getElement('.aid').getElement('span').removeClass('isUnderdog');
						      div.getElement('.hid').getElement('span').removeClass('isUnderdog');
						      div.getElement('.open').removeClass('isUnderdog');
						      underdog.value = 0;
						    } else if (step < 0 ) {
						      div.getElement('.aid').getElement('span').addClass('isUnderdog');
						      div.getElement('.hid').getElement('span').removeClass('isUnderdog');
						      div.getElement('.open').addClass('isUnderdog');
						      underdog.value = -maps.underdog[-step];
						    } else {
						      div.getElement('.hid').getElement('span').addClass('isUnderdog');
						      div.getElement('.aid').getElement('span').removeClass('isUnderdog');
						      div.getElement('.open').addClass('isUnderdog');
						      underdog.value = maps.underdog[step];
						    }
						    var updateReq = new MBB.req('updatematch.php',function(response) {
							//Should not be necessary to update page (but may have effected the user picks part)
						      $('userpick').empty();
						    });
						    updateReq.post(div.getElement('form'));
						  }