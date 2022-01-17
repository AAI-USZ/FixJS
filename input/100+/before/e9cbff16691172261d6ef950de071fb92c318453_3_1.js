function Config() {
		this.initialize = function () {
			var that = this;
			this.widgets.form.setOnSubmit(function () {
				var data = that.widgets.form.getFormData();
				var parameters = [];
				F5.forEach({
					debug: true,
					inline: false,
					compress: false,
					platform: 'ios',
					mobile: true,
					native: false,
					pkg: data.pkg,
					console: true
				}, function (id, value) {
					parameters.push(id + '=' + value);
				});
				
				var url = location.protocol + '//' + location.host + '/generate?' + parameters.join('&');	
				console.log(url);			
				window.open(url, data.pkg);	
				
				location.href = location.protocol + '//' + location.host + '/ide?app=' + data.pkg;			
			});
		};
	}