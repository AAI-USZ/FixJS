function(){
  console.log('loading done!')
  console.log('initing...')
  clearTimeout(this.iniTimeout);
  
  /*
  if(window.innerHeight <= 600){
    this.context.scale(0.5,0.5);
    this.scale = 0.5;
  }else
    this.scale = 1;
  */

  //IMAGE SIZE
  if(this.resized)
    this.apply_scale();

  this.loaded = true;
  this.auto_snap = true;
  this.pieces = new Array();
  this.holders = new Array();
  this.placed_pieces = new Array();
  this.moving = true;
  this.selected = null;
  this.over = null;
  this.is_over = false;

  this.num_pieces = 5;

  //console.log(this.img.width+','+this.img.height)
  
  this.clock_interval = null;
  this.mouse = new Mouse(this);
  
  this.puzzles = [
    new Puzzle("006", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-298/2)+5, (this.canvas.height/2-400/2)+5), new Array(
      new Point2D(82,0),
      new Point2D(0,193),
      new Point2D(166,283),
      new Point2D(65,127))),
    new Puzzle("008", this, {has_voice: true, has_sound: false}, new Point2D((this.canvas.width/2-427/2)+5, (this.canvas.height/2-433/2)+5), new Array(
      new Point2D(28,0),
      new Point2D(0,257),
      new Point2D(58,109),
      new Point2D(185,0))),
    new Puzzle("005", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-346/2)+2, (this.canvas.height/2-425/2)+5), new Array(
      new Point2D(40,0),
      new Point2D(28,37),
      new Point2D(176,37),
      new Point2D(0,186),
      new Point2D(175,179))),
    new Puzzle("016", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-497/2), (this.canvas.height/2-500/2)+2), new Array(
      new Point2D(73,0),
      new Point2D(98,157),
      new Point2D(0,268),
      new Point2D(169,329))),
    new Puzzle("011", this, {has_voice: true, has_sound: false}, new Point2D((this.canvas.width/2-386/2), (this.canvas.height/2-466/2)+2), new Array(
      new Point2D(0,0),
      new Point2D(49,46),
      new Point2D(0,227),
      new Point2D(174,227),
      new Point2D(84,373))),
    new Puzzle("012", this, {has_voice: true, has_sound: false}, new Point2D((this.canvas.width/2-490/2), (this.canvas.height/2-454/2)+2), new Array(
      new Point2D(54,0),
      new Point2D(0,101),
      new Point2D(287,75),
      new Point2D(59,242),
      new Point2D(287,242))),
    new Puzzle("015", this, {has_voice: true, has_sound: false}, new Point2D((this.canvas.width/2-735/2), (this.canvas.height/2-466/2)+2), new Array(
      new Point2D(565,0),
      new Point2D(438,184),
      new Point2D(315,105),
      new Point2D(0,50),
      new Point2D(138,157))),
    new Puzzle("004", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-467/2), (this.canvas.height/2-333/2)), new Array(
      new Point2D(0,173),
      new Point2D(49,66),
      new Point2D(207,0),
      new Point2D(286,24),
      new Point2D(115,120),
      new Point2D(170,115))),
    new Puzzle("007", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-337/2)+3, (this.canvas.height/2-433/2)+5), new Array(
      new Point2D(0,61),
      new Point2D(144,0),
      new Point2D(27,38),
      new Point2D(26,58),
      new Point2D(95,226),
      new Point2D(193,215))),
    new Puzzle("009", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-425/2)+5, (this.canvas.height/2-666/2)+10), new Array(
      new Point2D(79,0),
      new Point2D(0,118),
      new Point2D(54,512),
      new Point2D(294,538),
      new Point2D(102,346),
      new Point2D(247,341))),
    new Puzzle("010", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-316/2), (this.canvas.height/2-446/2)+2), new Array(
      new Point2D(4,0),
      new Point2D(12,90),
      new Point2D(0,276),
      new Point2D(162,272),
      new Point2D(12,363),
      new Point2D(162,363))),
    new Puzzle("013", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-653/2), (this.canvas.height/2-433/2)+2), new Array(
      new Point2D(0,112),
      new Point2D(375,0),
      new Point2D(81,0),
      new Point2D(273,212),
      new Point2D(364,212),
      new Point2D(508,212))),
    new Puzzle("014", this, {has_voice: true, has_sound: false}, new Point2D((this.canvas.width/2-515/2), (this.canvas.height/2-500/2)+2), new Array(
      new Point2D(0,0),
      new Point2D(37,58),
      new Point2D(191,264),
      new Point2D(286,315),
      new Point2D(391,309),
      new Point2D(339,188))),
    new Puzzle("017", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-540/2), (this.canvas.height/2-348/2)+2), new Array(
      new Point2D(0,0),
      new Point2D(125,223),
      new Point2D(292,223),
      new Point2D(203,26),
      new Point2D(291,24),
      new Point2D(444,72))),
    new Puzzle("018", this, {has_voice: true, has_sound: false}, new Point2D((this.canvas.width/2-671/2), (this.canvas.height/2-456/2)+2), new Array(
      new Point2D(0,225),
      new Point2D(274,225),
      new Point2D(435,186),
      new Point2D(206,0),
      new Point2D(206,186),
      new Point2D(87,47))),
    new Puzzle("019", this, {has_voice: true, has_sound: true}, new Point2D((this.canvas.width/2-455/2), (this.canvas.height/2-490/2)+2), new Array(
      new Point2D(0,3),
      new Point2D(205,0),
      new Point2D(13,235),
      new Point2D(229,235),
      new Point2D(159,404),
      new Point2D(297,404),
      new Point2D(374,263))),
    new Puzzle("001", this, {has_voice: true, has_sound: false}, new Point2D((this.canvas.width/2-306/2), (this.canvas.height/2-347/2)-5), new Array(
      new Point2D(0,14),
      new Point2D(89,0),
      new Point2D(90,34),
      new Point2D(84,84),
      new Point2D(56,164),
      new Point2D(173,161),
      new Point2D(20,234))),
    new Puzzle("002", this, {has_voice: true, has_sound: false}, new Point2D((this.canvas.width/2-475/2)+20, (this.canvas.height/2-376/2)+32), new Array(
      new Point2D(30,18),
      new Point2D(0,81),
      new Point2D(192,5),
      new Point2D(271,0),
      new Point2D(271,88),
      new Point2D(320,164),
      new Point2D(259,172),
      new Point2D(184,152),
      new Point2D(120,138))),
    new Puzzle("003", this, {has_voice: true, has_sound: false}, new Point2D((this.canvas.width/2-303/2), (this.canvas.height/2-355/2)-5), new Array(
      new Point2D(96,0),
      new Point2D(16,23),
      new Point2D(97,87),
      new Point2D(1,145),
      new Point2D(0,203),
      new Point2D(55,196),
      new Point2D(145,209),
      new Point2D(195,281),
      new Point2D(142,280),
      new Point2D(40,277)))
  ];

  this.puzzle = this.puzzles[this.stage-1];

}