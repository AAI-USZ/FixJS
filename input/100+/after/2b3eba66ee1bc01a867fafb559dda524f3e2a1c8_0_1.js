function(select,action,data,d,val){
		var t;
		if(action=='create'){
			t=data.val;
			val=d
		}else{
			t=onAdd(select,val);
		}
		$('<li style="display:none;opacity:0"/>').attr('rel',val).html($('<span/>').text(t)).append(' <a href="#" class="icon action delete"></a>').appendTo(ul).animate({opacity:1,height:'toggle'},'slow');
		ul.change();
	}