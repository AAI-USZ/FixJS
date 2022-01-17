function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id(), id4 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px; display: inline;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll; margin: 10px; padding: 10px;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px; margin: 10px;'>hello</div></div></div>";
	get(id2).scrollTop = 100;
	get(id3).scrollTop = 100;

	el = baidu.dom("#" + id4);
	
	equal( el.offset().left, 50,  "relative + absolute + scroll + scroll + margin, left");
	equal( el.offset().top, -150,  "relative + absolute + scroll + scroll + margin, top");

	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );
	
	div.remove();
}