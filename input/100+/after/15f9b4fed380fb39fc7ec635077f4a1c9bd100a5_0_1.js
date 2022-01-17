function(){
	var frag = can.buildFragment("<select><option>a</option></select>",[document]);
	var qta = document.getElementById('qunit-test-area');
	qta.innerHTML = "";
	qta.appendChild(frag);
	
	/*qta.addEventListener("foo", function(){
		ok(false, "event handler called")
	},false)*/
	

	// destroyed events should not bubble
	
	
	qta.getElementsByTagName("option")[0].addEventListener("foo", function(ev){
		ok(true,"option called");
		ev.stopPropagation();
		//ev.cancelBubble = true;
	}, false);
	
	qta.getElementsByTagName("select")[0].addEventListener("foo", function(){
		ok(true,"select called")
	}, false)
	
	var ev = document.createEvent("HTMLEvents");
	ev.initEvent("foo", true , true);
	qta.getElementsByTagName("option")[0].dispatchEvent(ev); 
	
	//can.trigger(qta,"foo")
	
	stop();
	setTimeout(function(){
		start();
		ok(true);
	},100)
}