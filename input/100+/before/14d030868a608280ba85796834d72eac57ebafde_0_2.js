function(isUser1)
{
    this.AddStanceAnimations();
    this.selectIcon_.Element = window.document.createElement("div");
    this.selectIcon_.Element.className = "select-icon";
    this.portriatElement_ = window.document.createElement("div");
    this.shadowElement_.Element = window.document.createElement("div");
    this.shadowElement_.Element.className = "stance-shadow";
    this.nameElement_.Element = window.document.createElement("div");
    this.nameElement_.Element.className = "stance-name";
    this.selectedCharStance_.Element = window.document.createElement("div");
    this.element_.Element = window.document.createElement("div");

    var parentElement = window.document.getElementById("pnlStage");
    parentElement.appendChild(this.selectIcon_.Element);
    parentElement.appendChild(this.portriatElement_);
    this.element_.Element.appendChild(this.shadowElement_.Element);
    this.element_.Element.appendChild(this.nameElement_.Element);
    this.element_.Element.appendChild(this.selectedCharStance_.Element);

    parentElement.appendChild(this.element_.Element);

    if(!!isUser1)
    {
        this.selected_ = CHARACTERS.RYU;
        this.animations_["select_icon"] = CreateBasicAnimation("select_icon",[],true);
        this.animations_["select_icon"].AddFrame(this,"|images/misc/misc/p1-select-0.png",1);
        this.animations_["select_icon"].AddFrame(this,"|images/misc/misc/p1-select-1.png",1);

        this.element_.Element.className = "stance-container-p1";
        this.portriatElement_.className = "select-portriat-p1";
        this.selectedCharStance_.Element.className = "select-stance-p1"
    }
    else
    {
        this.selected_ = CHARACTERS.KEN;
        this.animations_["select_icon"] = CreateBasicAnimation("select_icon",[],true);
        this.animations_["select_icon"].AddFrame(this,"|images/misc/misc/p2-select-0.png",1);
        this.animations_["select_icon"].AddFrame(this,"|images/misc/misc/p2-select-1.png",1);

        this.element_.Element.className = "stance-container-p2";
        this.portriatElement_.className = "select-portriat-p2";
        this.selectedCharStance_.Element.className = "select-stance-p2"
    }
}