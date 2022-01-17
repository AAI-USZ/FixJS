function(){
			var parent = this;
			
			var templateStatusColumn = $("#table-status-column").text();
			var templateNumberColumn = $("#table-number-column").text();
			var templateClientColumn = $("#table-client-column").text();
			var templateProjectColumn = $("#table-project-column").text();
			var templateAmountColumn = $("#table-amount-column").text();
			//   {"name":"", "style":["general-bg", "text-center", "no-border-right", "no-border-top", "no-border-bottom"]},
			this.table = $(parent.el).kernely_table({
				columns:[
				       {"name":templateStatusColumn, "style":"text-center"},
				       {"name":templateNumberColumn, "style":""},
				       {"name":templateClientColumn, "style":""},
				       {"name":templateProjectColumn, "style":""},
				       {"name":templateAmountColumn, "style":"text-center"},
				       {"name":"", "style":["text-center", "icon-column"]},
				       {"name":"", "style":["text-center", "icon-column"]}],
				idField:"id",
				elements:["status", "code", "organizationName", "projectName", "amount", "buttonView", "buttonEdit"],
				eventNames:["click"],
				events:{
					"click": parent.selectLine
				},
				editable:true
			});
		}