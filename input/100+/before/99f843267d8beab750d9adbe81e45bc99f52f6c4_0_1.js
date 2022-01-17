function() {
        var str = "";
        var suit = 0;
        var royal = "";
        
        for (var i = 0; i < cards.length; i++) {
            switch (cards[i].getSuit()) {
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
            if (cards[i].getNumber() > 10 || cards[i].getNumber() == 1) {  
                switch (cards[i].getNumber()) {
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
                str += cards[i].getNumber() + " of " + suit + "\n";
            }
            
        }
        return str;
    }