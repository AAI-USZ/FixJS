function(){
				var setting = AdminSetting.findByAttribute('setting','voteweekend');
				if(setting !== null){
					return true;
				}
				switch(this.getDate().getDay()){
					case 1: //Monday
					case 2: //Tuesday
					case 3: //Wednesday
					case 4: //Thursday
					case 5: //Friday
						return true;
					case 6: //Saturday
					case 0: //Sunday
						return false;
				}
			}