function wHTML() {
	// ditching the onClick stuff on anchor ..
	//alert("wHTML feeder called");
	//var dateago = prettyDate(this.added); // something goes bad here 
	//alert(dateago);
			var html ="<li id='"+this.id+"'><img src='img/bep.jpg' width='600' height='600' /> <h3>" + this.title + "</h3><a id='' class='aaa'></a><a id='' class='bbb'></a><a id='' class='ccc' onclick='reqpopup()' href='#request-box'></a>"+"<div style='clear:right;'></div>"+"<h1 style='{font-style:italic;}'>By:"+ this.by + "</h1> <br>"+prettyDate(this.added)+"<br>"+"<a class='more' onclick='more(this);'>More</a><span class='respond' onclick='respopup()'>respond</span></li>"; // more and respond
		//alert("it looks like this:"+html);
		return html;
	}