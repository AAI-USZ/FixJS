function(){
			var parent = this;
			
			var templateNameColumn = $("#table-expense-name-column").text();
			var templateDirectColumn = $("#table-expense-direct-column").text();
			var templateRatioColumn = $("#table-expense-ratio-column").text();
			this.table = $(parent.el).kernely_table({
				columns:[
				      {"name":templateNameColumn,"style":""},
				      {"name":templateDirectColumn,"style":""},
				      {"name":templateRatioColumn,"style":""}
				],
				idField:"id",
				elements:["name", "direct", "ratio"],
				eventNames:["click"],
				events:{
					"click": parent.selectLine
				},
				editable:true
			});
		}