function(){
	
	var text = "<div><% if( obs.attr('sex') == 'male' ){ %>"+
			"<span>Mr.</span>"+
		"<% } else { %>"+
		  "<label>Ms.</label>"+
		"<% } %>"+
		"</div>"
	
	
	var obs = new can.Observe({
		sex : 'male'
	})
	
	var compiled = new can.EJS({text: text}).render({obs: obs});
	
	var div = document.createElement('div');

	div.appendChild(can.view.frag(compiled))
	
	// toUpperCase added to normalize cases for IE8
	equals(div.getElementsByTagName('div')[0].innerHTML.toUpperCase(), "<span>Mr.</span>".toUpperCase(),"initial content")
	
	obs.attr('sex','female')
	
	equals(div.getElementsByTagName('div')[0].innerHTML.toUpperCase(), "<label>Ms.</label>".toUpperCase(),"updated label")
	
}