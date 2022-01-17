function trivia_init()
{
	triviachan = sys.channelId('Trivia');
	revchan = sys.channelId('TrivReview');
	if(typeof Trivia === "undefined"){
			Trivia = new TriviaGame();
			triviaq = new QuestionHolder("triviaq.json");
			trivreview = new QuestionHolder("trivreview.json");
			tadmin = new TriviaAdmin("tadmins.txt");
	}

    Trivia.sendAll("Trivia is now running!");
}