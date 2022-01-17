function () {
            if(gop.data.user.get('actions') != -1){
	            gop.data.user.save({actions: gop.numberOfFreeActions2}, {});
            }
        }