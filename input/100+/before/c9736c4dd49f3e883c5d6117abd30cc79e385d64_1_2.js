function(viewName,direction,data){
			var home;
			home = this.getApplication().getController('Home');
			home.changeView(viewName,direction,data);
		}