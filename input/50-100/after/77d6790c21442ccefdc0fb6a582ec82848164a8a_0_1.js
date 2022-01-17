function(newValue) {
        //Closes or opens the bid dialog depending on the game mode
        
        if(newValue == CinchApp.gameModeEnum.bid) {
            if(self.matchPoints().length > 0) {
                //If match points on record, hand ended, open hand end dialog.
                CinchApp.secondaryActionQueue.push(function() {
                    //Need to ensure this is ran after all other end of trick actions, but
                    //we can't guarantee key order in the updates. So re-push this till later.
                    CinchApp.secondaryActionQueue.push(function() {
                        openJqmDialog('#hand-end-page');
                    });
                });
            }
            else {
                //Otherwise, game just started, start bidding.
                self.startBidding();
            }
        }
        else {
            //Clear any old bids
            self.resetBids();
        
            //Navigate back to game page when in play mode
            $.mobile.changePage( '#game-page', { transition: 'slideup'} );
        }
    }