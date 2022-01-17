function ProvVisLayout(provVis) {
	this.provVis = provVis;
	//These settings work well
//  this.iterations = 50;
//  this.maxRepulsiveForceDistance = 200;
//  this.r = 4000;
//  this.a = 95;
//  this.c = 0.02;
//  this.w1 = 0.01;
//  this.w2 = 1000000;
//  this.maxVertexMovement = 10;  

//TODO - maybe set these parameters automatically based on the size of the graph.
  this.iterations = 50.0;
  this.maxRepulsiveForceDistance = 200.0;
  this.r = 4000.0;
  this.a = 198.0;
  this.c = 0.02;
  this.w1 = 0.01;
  this.w2 = 1000000.0;
  this.maxVertexMovement = 60.0;  


 // jsPlumb.width = 540, jsPlumb.height = 530, jsPlumb.offsetX=1200, jsPlumb.offsetY=1020;

  
	this.layoutPrepare = function() {
      for (var i in provVis.core.graph) {
          var node = provVis.core.graph[i];
          /*if(node.layoutPosX == null)
          	node.layoutPosX = Math.random()*1.0;
          else{*/
          	node.layoutPosX = $("#"+provVis.core.getLocalName(node.id)).position().left;
         // }
          	
         /* if(node.layoutPosY == null)
          	node.layoutPosY = Math.random()*1.0;
          else{*/
          	node.layoutPosY = $("#"+provVis.core.getLocalName(node.id)).position().top;
         // }
          node.layoutForceX = 0;
          node.layoutForceY = 0;
      }
  };
  
	this.layoutRepulsive = function(node1, node2, weight) {
      if (typeof node1 == 'undefined' || typeof node2 == 'undefined')
          return;
      var dx = node2.layoutPosX - node1.layoutPosX;
      var dy = node2.layoutPosY - node1.layoutPosY;
      var d2 = dx * dx + dy * dy;
      if(d2 < 0.01) {
          dx = 0.1 * Math.random() + 0.1;
          dy = 0.1 * Math.random() + 0.1;
          d2 = dx * dx + dy * dy;
      }
      var d = Math.sqrt(d2);
      if(d < this.maxRepulsiveForceDistance) {
          var repulsiveForce = weight * weight / d;
          node2.layoutForceX += repulsiveForce * dx / d;
          node2.layoutForceY += repulsiveForce * dy / d;
          node1.layoutForceX -= repulsiveForce * dx / d;
          node1.layoutForceY -= repulsiveForce * dy / d;
      }
  };

  this.layoutAttractive = function(node1, node2, weight) {
  	//"from":escfrom, "to":escto, "title":name
  	
      
      var dx = node2.layoutPosX - node1.layoutPosX;
      var dy = node2.layoutPosY - node1.layoutPosY;
      var d2 = dx * dx + dy * dy;
      if(d2 < 0.01) {
          dx = 0.1 * Math.random() + 0.1;
          dy = 0.1 * Math.random() + 0.1;
          d2 = dx * dx + dy * dy;
      }
      var d = Math.sqrt(d2);
      if(d > this.maxRepulsiveForceDistance) {
          d = this.maxRepulsiveForceDistance;
          d2 = d * d;
      }
      var attractiveForce = this.a*(1+Math.sin(Math.PI/2*d/this.maxRepulsiveForceDistance-Math.PI/2));// - this.a * this.a) / this.a;
      if(weight == undefined) weight = 1;
      attractiveForce *= Math.log(weight+1) * 0.5 + 1;
      
      node2.layoutForceX -= attractiveForce * dx / d;
      node2.layoutForceY -= attractiveForce * dy / d;
      node1.layoutForceX += attractiveForce * dx / d;
      node1.layoutForceY += attractiveForce * dy / d;
  };
  
	this.layoutIteration = function(){
      // Forces on nodes due to node-node repulsions
      var prev = new Array();
      for(var c in provVis.core.graph) {
          var node1 = provVis.core.graph[c];
          if(!provVis.core.testVisible(node1))
          	continue;
          for (var d in prev) {
              var node2 = provVis.core.graph[prev[d]];
              if(!provVis.core.testVisible(node2))
              	continue;
              this.layoutRepulsive(node1, node2, this.r);
              this.layoutAttractive(node1, node2, this.w1);
          }
          prev.push(c);
      }
      
      // Forces on nodes due to edge attractions
      for(var c in provVis.core.graph) {
          if(!provVis.core.testVisible(provVis.core.graph[c]))
          	continue;
	        for (var i = 0; i <  provVis.core.graph[c].adjacencies.length; i++) {
	            var edge = provVis.core.graph[c].adjacencies[i];

	            var node1 = provVis.core.graph[$("#"+provVis.core.getLocalName(edge.from)).attr("data-node")];
	            var node2 = provVis.core.graph[$("#"+provVis.core.getLocalName(edge.to)).attr("data-node")];
	            this.layoutAttractive(node1, node2, this.w2);  
              this.layoutRepulsive(node1, node2, this.r/5.0);           
	        }
      }
      
      // Move by the given force
      for (var i in provVis.core.graph) {
          var node = provVis.core.graph[i];
          if(!provVis.core.testVisible(node))
          	continue;
          var xmove = this.c * node.layoutForceX;
          var ymove = this.c * node.layoutForceY;

          var max = this.maxVertexMovement;
          if(xmove > max) xmove = max;
          if(xmove < -max) xmove = -max;
          if(ymove > max) ymove = max;
          if(ymove < -max) ymove = -max;
          
          node.layoutPosX += xmove;
          node.layoutPosY += ymove;
          node.layoutForceX = 0;
          node.layoutForceY = 0;
      }
  };
	this.layoutSpring = function(){
  	this.layoutPrepare();
	    for (var i = 0; i < this.iterations; i++) {
	        this.layoutIteration();
	    }

	};
	

  this.layoutTimestamp = function() {
  	function getTimestamp(node){
  		for (var j=0;j<node.properties.length;j++){
              var prop = node.properties[j];
          	if("http://www.policygrid.org/ourspacesVRE.owl#timestamp"!=prop.name)
          		continue;
              return 1.0*prop.value;
          }
  		return null;
  	}    	
  	function getIndex(nodeId, copy){
          for (var i=0;i<copy.length;i++) {
              var node2 = copy[i];
              if(nodeId == node2.id)
              	return i;
          }
          return -1;
  	}    	
  	function getOtherIndex(edge, copy, nodeId){
          //var index1 = $("#"+provVis.core.getLocalName(edge.from)).attr("data-node");
          //var index2 = $("#"+provVis.core.getLocalName(edge.to)).attr("data-node");
  		if(nodeId == edge.from)
  			return getIndex(edge.to, copy);
  		else
  			return getIndex(edge.from, copy);
  	}
  	Math.seedrandom(seed);
      var i = 0;
      var copy = [];
      for (i in provVis.core.graph) {
          var node = provVis.core.graph[i];
          if(!provVis.core.testVisible(node))
          	continue;
          node.layoutPosX = 0;
         // node.layoutPosY = 0;
          copy.push(node);
      }
      copy.sort(function (a,b) { 
      	var t1,t2;
      	t1 = getTimestamp(a);
      	t2 = getTimestamp(b);        	
      	return t1-t2; }
      ); 
      //Set all y to 0
      for (i=0;i<copy.length;i++) {
          var node = copy[i];
          node.layoutPosY = 0;//Math.random();
      }
      var lastT=-1, lastIndex=-1, counter = 0, maxY = 0, countNulls = 0;
      //Sort according to the timestamp
      for (i=0;i<copy.length;i++) {
          var node = copy[i];
          //Check the edge to previous nodes
          //TODO - finish it
          //Offset the nodes connected to this one
          /*node.adjacencies.sort( this.function (a,b) { 
		            var index1 = getOtherIndex(a, i);
		            var index2 = getOtherIndex(b, i);
		            var node1 = provVis.core.graph[index1];
		            var node2 = provVis.core.graph[index2];
		            var i1 = getIndex(node1, copy);
		            var i2 = getIndex(node2, copy);
	            	return i1-i2; 
          }); 
	        for (var j = 0; j <  node.adjacencies.length; j++) {
	            var edge = node.adjacencies[j];
	            var index = getOtherIndex(edge, i);
	            var node2 = provVis.core.graph[index];
	            //Offset the node a little bit up
	            node2.layoutPosY = node.layoutPosY + j*10;
	        }*/
          var t = getTimestamp(node);
          if(t == null || node.basicType == "Agent"){
          	countNulls++;
          }
          if(lastT==t){
          	//Artifacts on the top, processes on the bottom
          	if(node.basicType == "Artifact" && copy[i-1].basicType == "Process"){
          		copy[i-1].layoutPosY = 1+counter;
          	}
          	else{
              	node.layoutPosY = 1+counter;            		
          	}
          	if(maxY < 1+counter)
          		maxY = 1+counter;
          	node.layoutPosX = lastIndex;
          	counter++;
          } 
          else{
          	lastIndex++;
          	node.layoutPosX = lastIndex;
          	lastT = t;
          	counter = 0;
          }
      }
      //Position those without timestamp
      // 1) Find the average position of the end of the edges
      for (var i=0;i<copy.length;i++) {
          var node = copy[i];
          var t = getTimestamp(node);
          if(t == null || node.basicType == "Agent"){
          	var avgX = 0, divider = 0;
  	        for (var j = 0; j <  node.adjacencies.length; j++) {
  	            var edge = node.adjacencies[j];
  	            var index = getOtherIndex(edge, copy, node.id);
  	            
  	            if(index == -1 || !provVis.core.testVisible(copy[index]))
  	            	continue;
  	            avgX+=copy[index].layoutPosX;
  	            divider++;
  	        }
  	        avgX /= divider;
          	node.layoutPosX = avgX;
          	node.layoutPosY = maxY*1.5;
          }
      }

      copy.sort(function(a,b) { 
      	var t1,t2;
      	t1 = a.layoutPosX;
      	t2 = b.layoutPosX;        	
      	return t1>t2; }
      ); 
      
      //2) Split nodes with same x position
      var lastX = 0;
      for (var i=0;i<copy.length;i++) {
          var node = copy[i];
          var t = getTimestamp(node);
          if(t == null || node.basicType == "Agent"){
          	lastX++;
      		node.layoutPosX = lastX*lastIndex/countNulls;     	
          }
      }
      /*
      for (i=0;i<copy.length;i++) {
          var node = copy[i];
          var t = getTimestamp(node);
          if(t == null || node.basicType == "Agent"){
          	node.layoutPosY = maxY*1.5;
          	node.layoutPosX = (lastIndex+2) / 2 - (countNulls-tmp-1);
          	tmp++;
          	
          }
      }*/
      /*for (i in provVis.core.graph) {
          var node = provVis.core.graph[i];
          if(!provVis.core.testVisible(node))
          	continue;
          if(node.layoutPosX == 0)
          	node.layoutPosX=minX;
      }*/
      
     /* var counter = 0;
      for (i in provVis.core.graph) {
          var node = provVis.core.graph[i];
          if(!provVis.core.testVisible(node))
          	continue;
          node.layoutPosX = counter;
          node.layoutPosY = 0;//Math.random();
          counter++;
      }*/
  };
  this.layoutOrder = function() {
      for (i in provVis.core.graph) {
          var node = provVis.core.graph[i];
          if(!provVis.core.testVisible(node))
          	continue;
          node.layoutPosX = 0;
          node.layoutPosY = 0;
      }
      //Sort according to the adjacencies.length
      var i = 0;
      for (i=0;i<provVis.core.graph.length;i++) {
      	var found = false;
          var node1 = provVis.core.graph[i];
          if(!provVis.core.testVisible(node1))
          	continue;
          for (var j in provVis.core.graph) {
              var node2 = provVis.core.graph[j];
              if(!provVis.core.testVisible(node2))
              	continue;
              if(node2.adjacencies.length<node1.adjacencies.length){
              	provVis.core.graph[i] = node2;
              	provVis.core.graph[j] = node1;
              	found = true;
              	break;
              }
          }
          if(found)
          	i--;
      }
      var counter = 0;
      for (i in provVis.core.graph) {
          var node = provVis.core.graph[i];
          if(!provVis.core.testVisible(node))
          	continue;
          node.layoutPosX = counter;
          node.layoutPosY = Math.random();
          counter++;
      }
  };
  
  this.resize = function(){
      var minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;

		$("#"+jsPlumb.canvas).css("left",-jsPlumb.offsetX+"px");
		$("#"+jsPlumb.canvas).css("top",-jsPlumb.offsetY+"px");
		//jsPlumb.height = $("#"+jsPlumb.canvas).height();
		//jsPlumb.width = $("#"+jsPlumb.canvas).width();
		
      for (i in provVis.core.graph) {
          if(!provVis.core.testVisible(provVis.core.graph[i]))
          	continue;
          var x = provVis.core.graph[i].layoutPosX;
          var y = provVis.core.graph[i].layoutPosY;
          
          if(x > maxx) maxx = x;
          if(x < minx) minx = x;
          if(y > maxy) maxy = y;
          if(y < miny) miny = y;
      }
      for(var c in provVis.core.graph) {
          var node = provVis.core.graph[c];
          if(!provVis.core.testVisible(node))
          	continue;
          var d = $("#"+provVis.core.getLocalName(node.id));
          if(maxy==miny)
          	;//d.css("top",(jsPlumb.offsetY+jsPlumb.height*(1)/(2)) + 'px');
          else
          	d.css("top",(jsPlumb.offsetY+jsPlumb.height*(node.layoutPosY-miny)/(maxy-miny)) + 'px');
          if(maxx==minx)
          	d.css("left", (jsPlumb.offsetX+(jsPlumb.width-100)*(1)/(3)) + 'px');
          else
          	d.css("left", (jsPlumb.offsetX+(jsPlumb.width-100)*(node.layoutPosX-minx)/(maxx-minx)) + 'px');		
      }
		jsPlumb.repaintEverything();//Everything
  };
	/**
	 * Layout the graph
	 */
	this.layout = function(){   
		//layoutSpring();
		//layoutOrder();
		this.layoutTimestamp();
		this.resize();
	};
}