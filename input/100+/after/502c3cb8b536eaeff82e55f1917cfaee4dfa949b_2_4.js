function(model) {
		
			this.dataBinding = new O.Binding(this.target);
			this.dataBinding.clear();
			this.dataBinding.bindList(model);
		
		}