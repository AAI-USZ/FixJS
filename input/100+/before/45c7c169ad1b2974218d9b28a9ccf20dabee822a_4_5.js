function makeinput_popup(me, iconsrc, iconsrc1, iconsrc2) {
	
	var icon_style = {cursor: 'pointer', width: '16px', verticalAlign:'middle',
		marginBottom:'-3px'};
	
	me.input = $a(me.input_area, 'div');
	if(!me.not_in_form)
		$y(me.input, {width:'80%'});
		
	me.input.set_width = function(w) {
		$y(me.input, {width:(w-2)+'px'});
	}
	
	var tab = $a(me.input, 'table');
	me.tab = tab;
	
	$y(tab, {width:'100%', borderCollapse:'collapse', tableLayout:'fixed'});
	
	var c0 = tab.insertRow(0).insertCell(0);
	var c1 = tab.rows[0].insertCell(1);
	
	$y(c1,{width: '20px'});
	me.txt = $a($a($a(c0, 'div', '', {paddingRight:'8px'}), 'div'), 'input', '', {width:'100%'});

	me.btn = $a(c1, 'i', iconsrc, icon_style)

	if(iconsrc1) // link
		me.btn.setAttribute('title','Search');
	else // date
		me.btn.setAttribute('title','Select Date');

	if(iconsrc1) {
		var c2 = tab.rows[0].insertCell(2);
		$y(c2,{width: '20px'});
		me.btn1 = $a(c2, 'i', iconsrc1, icon_style)
		me.btn1.setAttribute('title','Open Link');
	}

	if(iconsrc2) {
		var c3 = tab.rows[0].insertCell(3);
		$y(c3,{width: '20px'});
		me.btn2 = $a(c3, 'i', iconsrc2, icon_style)
		me.btn2.setAttribute('title','Create New');
		$dh(me.btn2);
	}
		
	if(me.df.colour)
		me.txt.style.background = '#'+me.df.colour.split(':')[1];
	me.txt.name = me.df.fieldname;

	me.setdisabled = function(tf) { me.txt.disabled = tf; }
}