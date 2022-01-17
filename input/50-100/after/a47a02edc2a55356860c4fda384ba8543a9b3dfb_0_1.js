function(){
    var protocol = $(this).attr('data-protocol')
      , port = $('.js-portNum.js-'+protocol).val()
      ;
    if(!port){
      return;
    }
    makeRequest(protocol, port);
	}