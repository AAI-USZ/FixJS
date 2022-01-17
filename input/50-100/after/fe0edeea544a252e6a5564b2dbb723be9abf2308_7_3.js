function(form){
	form = (typeof(form) == "string")? eXo.calendar.UICalendarPortlet.getElementById(form):form ;
	if(!form) return ;
	var tr = gj(form).find("tr.UIListViewRow");
	var i = tr.length ;
	eXo.calendar.UICalendarPortlet.viewType = "UIListView";
	var chk = null ;
	while(i--){
		tr[i].ondblclick = this.listViewDblClickCallback;		
//gj(tr[i]).on('dblclick',this.listViewDblClickCallback);
	}
}