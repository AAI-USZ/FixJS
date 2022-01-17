function()
    {
        this.isDone_ = false;
        capElement_ = window.document.createElement("div");
        capElement_.className = "capcom";
        capElement_.id = "pnlCapcom";
        parent_.appendChild(capElement_);

        insertCoinElement_ = window.document.createElement("div");
        insertCoinElement_.className = "insert-coin";
        insertCoinElement_.id = "pnlInsertCoin";
        parent_.appendChild(insertCoinElement_);

        creditsElement_ = window.document.createElement("div");
        creditsElement_.className = "credits";
        creditsElement_.id = "pnlCredits";
        creditsElement_.style.display = "none";
        parent_.appendChild(creditsElement_);

        creditsTextElement_ = window.document.createElement("div");
        creditsTextElement_.className = "credits-text";
        creditsTextElement_.id = "pnlCredits";
        creditsTextElement_.style.display = "none";
        parent_.appendChild(creditsTextElement_);

        text1_ = fontSystem_.AddText("pnlCredits","",432,555,0,"font1");
        //text1_.ShowNow(432);
        window.document.getElementById("pnlStage").style.backgroundImage = "url(images/misc/misc/insert-coin.png)";
    }