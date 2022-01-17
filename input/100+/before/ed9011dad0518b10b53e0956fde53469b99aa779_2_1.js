function(mode) {
    lime.Sprite.call(this);

    this.RADIUS = 10;
    this.SPEED = .45;
    this.WIDTH = 300;
    this.HEIGHT = 360;
    this.mode = 1;
    this.winning_score = 10;

	this.GRAVITY = 1; //gravity constant
	
    this.setAnchorPoint(0, 0);
    this.setSize(320, 550); //orig val 320,460
	this._decayTable = new nucleotron.DecayTable();
	//
	this.particles = new Array();
	//this.particles[0] = null;
	
    var back = new lime.fill.LinearGradient().addColorStop(0, '#bbb').addColorStop(1, '#DDD');
    this.setFill(back);


    this.world = new lime.Sprite().setFill('#FFF').setSize(this.WIDTH, this.HEIGHT).setPosition(10, 50).
        setAnchorPoint(0, 0);
    this.appendChild(this.world);

    this.p1 = new nucleotron.Player(1);
    this.p1.enableInteraction();
    this.world.appendChild(this.p1);

    this.p2 = new nucleotron.Player(0);
    if (mode == 1)
    this.p2.enableSimulation();
    else
    this.p2.enableInteraction();
    //this.world.appendChild(this.p2);
	//add buttons
	this.btnPro = new lime.GlossyButton('Protron').setSize(100, 40).setPosition(50, 400);
	this.btnEle = new lime.GlossyButton('Electron').setSize(100, 40).setPosition(150, 400);
	this.btnAlp = new lime.GlossyButton('Alpha').setSize(100, 40).setPosition(250, 400);
		
	
	this.world.appendChild(this.btnPro);
	this.world.appendChild(this.btnEle);
	this.world.appendChild(this.btnAlp);
	
    this.ball = new lime.Circle().setSize(this.RADIUS * 2, this.RADIUS * 2).setFill(200, 0, 0);
    //this.world.appendChild(this.ball);
    this.placeball();

    this.notice = new nucleotron.Notice().setPosition(160, 200).setHidden(false);
    this.appendChild(this.notice);

    this.endRoundSound = new lime.audio.Audio('assets/applause.wav');
    this.bounceSound = new lime.audio.Audio('assets/bounce.wav');
}