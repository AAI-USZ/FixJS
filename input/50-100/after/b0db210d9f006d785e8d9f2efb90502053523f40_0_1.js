function(){
			jQuery('<li class="ui-daterangepicker-'+ $(this).text().replace('/\u0020/g', '')+' ui-corner-all"><a href="#">'+ this.text +'</a></li>')
			.data('dateStart', this.dateStart)
			.data('dateEnd', this.dateEnd)
			.appendTo(ul);
		}