function(){
			if(this.isPhone()){ return; }
			var view = this.getShowingView();
			if(view){
				view.show();
			}else{
				this.leftItemSelected();
			}
		}