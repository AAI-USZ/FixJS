function(){
	var PennyArcadeReaderComic = new nl.windgazer.YQLComic(
		(943<<16) + 3,
		"Penny Arcade",
		"http://penny-arcade.com/comic",
		"//div[@class=\"contentArea\"]//img|//ul[@class=\"newsNav top\"]//a[@class=\"btnPrev btn\"]|//ul[@class=\"newsNav top\"]//a[@class=\"btnNext btn\"]",
		{
			getHasNextEntry : function( entry ) {
				Console.log( "Attempting to determine next entry existence for Penny Arcade" );
				Console.log( entry.config["next"] );
				Console.log( PennyArcadeReaderComic.helper.settings["url"] );
				return ( entry.config["next"] && ( entry.config["next"].length - PennyArcadeReaderComic.helper.settings["url"].length ) > 2 );
			}
		}
	);

	Comics.addComic(PennyArcadeReaderComic.getId(), PennyArcadeReaderComic);
}