function(){
		css("position", "relative");
		css("color", "green");
		css("opacity", .1);

		equal( get("position"), "relative", "position" );
		ok( get("color") == "green" || get("color") == "rgb(0, 128, 0)" || get("color") == "#008000", "color" );

		if( ie )
			ok( ~ div.style.filter.indexOf("Alpha"), "opacity" );

		try{
			css( "z-index", 0 );
			equal( css("z-index"), 0, "z-index" ); // 抹平？
		}catch(e){
			ok( false, "报错啦" );
		}

		try{
			css( "zIndex", 2 );
			equal( css("z-index"), 2, "zIndex" );
			equal( css("zIndex"), 2, "zIndex" );
		}catch(e){
			ok( false, "报错啦" );
		}
		css( "width", 100 );
		equal( css("width"), "100px" );
		equal( get("width"), "100px" );

		css( "width", "200px" );
		equal( css("width"), "200px" );
		equal( get("width"), "200px" );

		css( "height", 100 );
		equal( css("height"), "100px" );
		equal( get("height"), "100px" );

		css( "height", "200px" );
		equal( css("height"), "200px" );
		equal( get("height"), "200px" );
        
		css( "font-weight", "bold" );
        css("font-weight");
		equal( css("font-weight"), 700, "font-weight" );
		equal( css("fontWeight"), 700, "fontWeight" );
        
		css( "line-height", 20 );
		equal( css("line-height"), "20px", "line-height" );
		equal( css("lineHeight"), "20px", "line-height" );

		css( "line-height", "30px" );
		equal( css("line-height"), "30px", "line-height" );
		equal( css("lineHeight"), "30px", "line-height" );

		css( "line-height", "2em" );
		//统一输出为px
		equal( css("line-height"), "32px", "line-height" );
		equal( css("lineHeight"), "32px", "line-height" );

		css( "float", "left" );
		equal( css("float"), "left", "float" );
		equal( div.style.styleFloat || div.style.cssFloat, "left", "float" );

		div.style.display = "none"; 
	}