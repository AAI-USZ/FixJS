function Hand(card1, card2) {
    this.cards = [card1, card2];
    
    this.getHand = function() {
        return this.cards;
    };
    this.score = function() {
        var total = 0;
        var numAces = 0;
        var temp = 0;
        
        for (var i = 0; i < this.cards.length; i++) {
          total += this.cards[i].getValue();
          numAces++;
        }
        // 
        temp = total;
        while (numAces > 0 && temp > 21) {
            temp -= 10;
            numAces -= 1;
        }
        return total;
    };
    this.printHand = function() {
        var str = "";
        var suit = 0;
        var royal = "";
        
        for (var i = 0; i < this.cards.length; i++) {
            switch (this.cards[i].getSuit()) {
                case 1:
                    suit = "clubs";
                    break;
                case 2:
                    suit = "diamonds";
                    break;
                case 3:
                    suit = "hearts";
                    break;
                case 4:
                    suit = "spades";
                    break;
            }
            if (this.cards[i].getNumber() > 10 || this.cards[i].getNumber() == 1) {  
                switch (this.cards[i].getNumber()) {
                    case 1:
                        royal = "Ace";
                        break;
                    case 11:
                        royal = "Jack";
                        break;
                    case 12:
                        royal = "Queen";
                        break;
                    case 13:
                        royal = "King";
                        break;
                }
              str += royal + " of " + suit + "\n";
            }
            else {
                str += this.cards[i].getNumber() + " of " + suit + "\n";
            }
            
        }
        return str;
    };
    this.hitMe = function(card) {
        this.cards.push(card);
    };
}