function checkAsserts(){
   // assert.equal(successLoginCount,expectedSuccessLoginCount);
    if(disconectsCount == 1){
        client4 = createConnection("client3",receiveCommand,"ok");
    }

    if(disconectsCount == 2){
        expectedSuccessLoginCount++;
    }
}