function(){
	
	var data = new can.Observe.List([
            {label:'branch1', children:[{id:2, label:'branch2'}]}
        ])
	
	var div = document.createElement('div');
	div.appendChild( can.view('//can/view/ejs/recursive.ejs',  {items: data}));
	ok(/class="leaf"/.test(div.innerHTML), "we have a leaf")
	
}