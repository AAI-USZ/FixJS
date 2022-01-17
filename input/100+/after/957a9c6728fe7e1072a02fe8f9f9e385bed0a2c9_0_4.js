function(event){
	
	var e = event || window.event;
	var target = event.target || event.srcElement;
	var dataindex_str = target.getAttribute('dataindex');
	if (dataindex_str) {
	$(".j_diskFormat").hide();
	wycVal.clickNum = this.getAttribute('clickNum');
		var dataindex_obj = eval(dataindex_str);
		var temp = $(this).find(".j_diskInfoTable");
		wycFun.fillDataTotable(dataindex_obj,temp);
		$(this).find(".j_diskFormat").show();
		//console.log($(this).find(".j_diskInfoTable"));
		switch (dataindex_obj.type) {
		case 'primary':
		case 'logical':
			$(this).find(".j_diskOperate").show().attr('diskData',dataindex_str);
			$(this).find(".j_diskempty").hide();
			break;
		case 'empty':
		$(this).find('.j_diskempty').show().attr('diskData',dataindex_str);
		$(this).find(".j_diskOperate").hide();
			break;
		default:
			break;
		}
	}
}