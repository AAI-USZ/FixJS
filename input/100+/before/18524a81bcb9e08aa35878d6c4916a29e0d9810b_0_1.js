function()
{
    if (this.started === false)
        return;
try { // Do not indent this, it is only until this starts to work
    // use concat to convert into array
    var answer,
        id,
		answers = [].concat(triviaq.get(this.roundQuestion).answer);
    
    this.answeringQuestion = false;
    /* We're going to judge points based on response time */
    var wrongAnswers = [],
        answeredCorrectly = [];
    var ignoreCaseAnswers = answers.map(function(s) {
        return String(s).toLowerCase();
		});
    for (id in this.submittedAnswers)
    {
        // if they are still online and using their name..
        var name = this.submittedAnswers[id].name;
        // is it required for them to be online?
        if (sys.id(name) !== undefined && this.player(name) !== null) {
            answer = this.submittedAnswers[id].answer.toLowerCase();
            if (ignoreCaseAnswers.indexOf(answer) != -1)
            {
                var responseTime = this.submittedAnswers[id].time;
                var realTime = time();
                var minus = realTime - responseTime;
                //var pointAdd = minus > 6 ? 5 : (minus < 7 && minus > 3 ? 3 : 2);
                var pointAdd = minus < 7 ? 5 : (minus < 9 ? 3 : 1);
                sys.sendMessage(sys.id("Lamperi"), "TriviaPointDebug: took" + minus + " seconds, point add is " + pointAdd + ".", triviachan);
				// TODO: check answer length, and base pointAdd off of that?

                answeredCorrectly.push(name);
                this.player(name).points += pointAdd;
            } else {
                wrongAnswers.push("<span title='" + utilities.html_escape(name) + "'>" + utilities.html_escape(this.submittedAnswers[id].answer) + "</span>");
            }
        }
    }

    sys.sendAll("", triviachan);
    var incorrectAnswers  = wrongAnswers.length > 0 ? " Incorrect answers: "+ wrongAnswers.join(", ") : "";
    sys.sendHtmlAll("<font color='#3daa68'><timestamp/> <font size='3'><b>±Psyduck:</b></font></font> Time's up!" + incorrectAnswers, triviachan);
    this.sendAll("Answered correctly: " + answeredCorrectly.join(", "),triviachan);
    var x = answers.length != 1 ? "answers were" : "answer was";
    this.sendAll("The correct "+x+": "+answers.join(", "),triviachan);

    var leaderboard = [];
    var winners = [];
    for (id in this.triviaPlayers)
    {
        var nohtmlname = utilities.html_escape(this.triviaPlayers[id].name);
        leaderboard.push(nohtmlname + " (" + this.triviaPlayers[id].points + ")");
        if (this.triviaPlayers[id].points >= this.maxPoints)
        {
            winners.push(nohtmlname + " (" + this.triviaPlayers[id].points + ")");
        }
    }

    this.sendAll("Leaderboard: "+leaderboard.join(", "),triviachan);

    if (winners.length > 0) {
        var w = (winners.length == 1) ? "the winner!" : "our winners!";
        this.htmlAll("<h2>Congratulations to "+w+"</h2>"+winners.join(", ")+"");
		Trivia.sendAll("Check the /topic for how to submit a question!", triviachan);
        this.resetTrivia();
        return;
    }
    if (Object.keys(this.alreadyUsed).length >= triviaq.questionAmount())
    {
        this.htmlAll("There are no more questions to show! Ask a TA to add more!<br/>The game automatically ended.");
        this.resetTrivia();
        return;
    }
    // initialize next questions
    var rand = sys.rand(17,30);
    this.sendAll("Please wait " + rand + " seconds until the next question!",triviachan);
    sys.delayedCall(function() {
        Trivia.startTriviaRound();
    }, rand);
} catch(e) {
// TODO REMOVE the catch block when this works
    sys.sendAll("script error: " + e, triviachan);
}
}