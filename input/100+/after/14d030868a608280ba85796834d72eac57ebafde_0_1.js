function(right,up,left,down,p1,p2,p3,k1,k2,k3,turn)
{
    this.Right = right;
    this.Up = up;
    this.Left = left;
    this.Down = down;
    this.P1 = p1;
    this.P2 = p2;
    this.P3 = p3;
    this.K1 = k1;
    this.K2 = k2;
    this.K3 = k3;
    this.Turn = turn;
    this.player_ = 0;
    this.selected_ = null;
    this.changeCharacterFn_ = null;
    this.animations_ = {};
    this.nbFrames_ = 0;
    this.selectIcon_ = { X:0,Y:0,Element:null,StartFrame:0 };
    this.isCharSelected_ = false;
    this.direction_ = 1;
    this.selectedCharStance_ = { X:undefined, Y:undefined, Element:null,StartFrame:0 }

    this.element_ = {X:0,Y:0,Element:null};
    this.portriatElement_ = {X:0,Y:0,Element:null};
    this.stanceElement_ = {X:0,Y:0,Element:null};
    this.shadowElement_ = {X:0,Y:0,Element:null};
    this.nameElement_ = {X:0,Y:0,Element:null};
    this.randomCharFace_ = {X:0,Y:0,Element:null}
    this.isInitialized_ = false;
    this.chooseCharacterFn_ = null;
    this.getOtherCharacterFn_ = null;
    this.getOtherIsAlternateFn_ = null;
    this.randomSelect_ = 0;
    this.isAlternateChar_ = false;
}