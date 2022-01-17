function()
    {
        this.isDone_ = true;
        utils_.RemoveFromDOM(capElement_);
        utils_.RemoveFromDOM(insertCoinElement_);
        utils_.RemoveFromDOM(creditsTextElement_);
        utils_.RemoveFromDOM(creditsElement_);
        window.document.getElementById("pnlStage").style.backgroundImage = "";
    }