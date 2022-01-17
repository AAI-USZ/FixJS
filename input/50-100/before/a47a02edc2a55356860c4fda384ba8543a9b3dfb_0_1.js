function(){
    if($(this).attr('data-protocol') === 'http'){
      var portNum = $('.js-portNum.js-http').val();
      tabs.makeNew($(this).attr('data-protocol'), portNum);
    }
    makeRequest($(this).attr('data-protocol'));
	}