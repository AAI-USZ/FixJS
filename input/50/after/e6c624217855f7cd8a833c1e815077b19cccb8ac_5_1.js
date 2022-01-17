function (comp)
		{	
			

			var b_save = this.down ('#save');

			if (Earsip.acl < 3) {
				b_save.setDisabled (true);
			} else {
				b_save.setDisabled (false);
			}
		}