function Track( url ) {
	var thisTrack = this;
	var e = document.createElement( "div" );
	e.className = "track loading";
	var nameElement = document.createElement("span");
	nameElement.class="name";
	nameElement.appendChild( document.createTextNode(url) );
	e.appendChild( nameElement );
	document.getElementById( "trackContainer" ).appendChild(e);
	this.trackElement = e;
	e.ondragenter = function () { 
		e.classList.add("droptarget"); 
		return false; };
	e.ondragleave = function () { e.classList.remove("droptarget"); return false; };
	e.ondrop = function (ev) {
  		ev.preventDefault();
		e.classList.remove("droptarget");
  		e.firstChild.innerText = ev.dataTransfer.files[0].name;
  		e.classList.add("loading");

	  	var reader = new FileReader();
	  	reader.onload = function (event) {
	  		audioContext.decodeAudioData( event.target.result, function(buffer) {
		    	thisTrack.buffer = buffer;
		    	thisTrack.revBuffer = thisTrack.reverseBuffer( buffer );
		    	thisTrack.trackElement.classList.remove( "loading" );
	  		}, function(){alert("error loading!");} ); 

	  	};
	  	reader.onerror = function (event) {
	  		alert("Error: " + reader.error );
		};
	  	reader.readAsArrayBuffer(ev.dataTransfer.files[0]);
	  	return false;
	};	

	this.loadNewTrack( url );
}