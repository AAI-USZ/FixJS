function () {
      console.log("Dealing");
      self.onmessage({
        "action": "deal",
        "card": {
          "kind": ("test" + (cardNum++))
        },
        "player": pNum, 
        "stack": 0
      });
      
      // rotate players
      pNum = (pNum + 1) % 4; // hardcoded number of players for basic testing
    }