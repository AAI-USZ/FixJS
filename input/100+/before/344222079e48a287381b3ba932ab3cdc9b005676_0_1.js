function Game() {
  this.world = new World();
  this.clients = {};
  this.articleTarget = new Article("DJF.me bob me");
  this.articles = {
    1: new Article("Tala Huhe - Man of the Year"),
    2: new Article("Devin Finzer - One cool dude"),
    3: new Article("Sketchalicious definition make the girls go loco"),
    4: new Article("HOLY CRAP IT'S A PLANET"),
    5: new Article("I think it's okay if the coffee is cold"),
    6: new Article("Hey I just met you"),
    7: new Article("And this is crazy"),
    8: new Article("But here's my number"),
    8: new Article("So call me maybe!!!!!!"),
    10: new Article("Deeeeerrrrrrrrrppppppppppp"),

  };
  this.nextPlayerId = 0;
}