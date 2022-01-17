function()
{
    switch(this.selected_)
    {
        case CHARACTERS.RYU: { this.currentStance_ = "ryu"; this.SetPositions("7px","17px","27px","0px",10,32); break; }
        case CHARACTERS.CHUNLI: { this.currentStance_ = "chunli"; this.SetPositions("7px","17px","27px","0px",12,28); break; }
        case CHARACTERS.CHARLIE: { this.currentStance_ = "charlie"; this.SetPositions("7px","17px","10px","0px",10,41); break; }
        case CHARACTERS.KEN: { this.currentStance_ = "ken"; this.SetPositions("7px","17px","27px","0px",10,32); break; }
        case CHARACTERS.GUY: { this.currentStance_ = "guy"; this.SetPositions("7px","17px","27px","0px",0,32); break; }
        case CHARACTERS.BIRDIE: { this.currentStance_ = "birdie"; this.SetPositions("7px","17px","27px","0px",16,28); break; }
        case CHARACTERS.SODOM: { this.currentStance_ = "sodom"; this.SetPositions("7px","17px","10px","0px",10,24); break; }
        case CHARACTERS.ADON: { this.currentStance_ = "adon"; this.SetPositions("7px","17px","27px","0px",10,32); break; }
        case CHARACTERS.RANDOM1: { this.randomSelect_ = this.randomSelect_ || 1; break; }
        case CHARACTERS.ROSE: { this.currentStance_ = "rose"; this.SetPositions("-3px","17px","2px","0px",-32,32); break; }
        case CHARACTERS.SAGAT: { this.currentStance_ = "sagat"; this.SetPositions("7px","17px","10px","0px",16,28); break; }
        case CHARACTERS.RANDOM2: { this.randomSelect_ = this.randomSelect_ || 1; break; }
        /*
        case CHARACTERS.AKUMA: { this.portriatElement_.src = (this.player_ == 1 ? "images/misc/misc/p1-select-portriat.png" : "images/misc/misc/p2-select-portriat.png"); break; }
        case CHARACTERS.MBISON: { this.portriatElement_.src = (this.player_ == 1 ? "images/misc/misc/p1-select-portriat.png" : "images/misc/misc/p2-select-portriat.png"); break; }
        case CHARACTERS.DAN: { this.portriatElement_.src = (this.player_ == 1 ? "images/misc/misc/p1-select-portriat.png" : "images/misc/misc/p2-select-portriat.png"); break; }
        */
    };

    spriteLookup_.Set(this.portriatElement_, (this.player_ == 1 ? "images/misc/misc/p1-select-" + this.currentStance_ + ".png" : "images/misc/misc/p2-select-" + this.currentStance_ + ".png"));
    //this.portriatElement_.src = (this.player_ == 1 ? "images/misc/misc/p1-select-" + this.currentStance_ + ".png" : "images/misc/misc/p2-select-" + this.currentStance_ + ".png");

    spriteLookup_.Set(this.shadowElement_.Element, "images/misc/misc/" + this.currentStance_ + "-shadow.png");
    //this.shadowElement_.Element.src = "images/misc/" + this.currentStance_ + "/shadow.png";

    spriteLookup_.Set(this.nameElement_.Element, "images/misc/font3/name-" + this.currentStance_ + ".png");
    //this.nameElement_.Element.src = "images/misc/font3/" + this.currentStance_ + ".png";

    if(!this.isCharSelected_ && !!this.randomSelect_)
    {
        if(this.player_ == 1)
            spriteLookup_.Set(this.randomCharFace_.Element, "images/misc/misc/char-" + this.currentStance_ + "-l.png");
        else
            spriteLookup_.Set(this.randomCharFace_.Element, "images/misc/misc/char-" + this.currentStance_ + "-r.png");
    }

}