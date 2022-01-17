function init() {	
	//load graph
  var sigInst = sigma.init($('#sigma-example')[0]).drawingProperties({
    defaultLabelColor: '#fff',
	defaultLabelBGColor: '#fff',
	defaultLabelHoverColor: '#000'
  }).graphProperties({
    minNodeSize: 0.5,
    maxNodeSize: 5
  });
	
	if(getQueryVariable('url') != false){
		parser = sigInst.parseGexf("data/"+findBaseName(getQueryVariable('url')));
	}else{
		var file = "hash/"+getQueryVariable('id')+".gexf";
		parser = sigInst.parseGexf(file);
	}
	
	// Bind events :
	  var greyColor = '#666';
	  sigInst.bind('overnodes',function(event){
	    var nodes = event.content;
	    var neighbors = {};
	    sigInst.iterEdges(function(e){
	      if(nodes.indexOf(e.source)<0 && nodes.indexOf(e.target)<0){
	        if(!e.attr['grey']){
	          e.attr['true_color'] = e.color;
	          e.color = greyColor;
	          e.attr['grey'] = 1;
	        }
	      }else{
	        e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
	        e.attr['grey'] = 0;

	        neighbors[e.source] = 1;
	        neighbors[e.target] = 1;
	      }
	    }).iterNodes(function(n){
	      if(!neighbors[n.id]){
	        if(!n.attr['grey']){
	          n.attr['true_color'] = n.color;
	          n.color = greyColor;
	          n.attr['grey'] = 1;
	        }
	      }else{
	        n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
	        n.attr['grey'] = 0;
	      }
	    }).draw(2,2,2);
	  }).bind('outnodes',function(){
	    sigInst.iterEdges(function(e){
	      e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
	      e.attr['grey'] = 0;
	    }).iterNodes(function(n){
	      n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
	      n.attr['grey'] = 0;
	    }).draw(2,2,2);
	  });

	sigInst.myRandomLayout();
	/*
  (function(){
    var popUp;

    function showNodeInfo(event) {
      popUp && popUp.remove();

      var node;
      sigInst.iterNodes(function(n){
        node = n;
      },[event.content[0]]);
 
      popUp = $(
        '<div class="node-info-popup"></div>'
      ).append(
        attributesToString( node['attr']['attributes'] )
      ).attr(
        'id',
        'node-info'+sigInst.getID()
      ).css({
        'display': 'inline-block',
        'border-radius': 3,
        'padding': 5,
        'background': '#fff',
        'color': '#000',
        'box-shadow': '0 0 4px #666',
        'position': 'absolute',
        'left': node.displayX,
        'top': node.displayY+15
      });

      $('ul',popUp).css('margin','0 0 0 20px');

      $('#sigma-example').append(popUp);
    }

    function hideNodeInfo(event) {
      popUp && popUp.remove();
      popUp = false;
    }

    sigInst.bind('overnodes',showNodeInfo).bind('outnodes',hideNodeInfo).draw();
  })();
	*/
	// hide nodes which should not show up at this time
	sigma.publicPrototype.HideWrongTimeNodes = function(value) {
		// update slider
		var tempcurrentDay = slider.getValue();
		slider.setValue(tempcurrentDay + value);
		currentDay = slider.getValue();
		
		// hide nodes
		this.iterNodes(function(n){	
		var localstartDate 	= n['attr']['startDate']; 
		var localendDate 	= n['attr']['endDate']; 

		if(localendDate == null){
			localendDate = maxdate;
		}
		
		// how many years ?
		var alldays = maxdate - mindate;

		// calc diff time
		var relLocalMin = localstartDate - mindate;
		var relLocalMax = maxdate - localendDate;

		// find hidden nodes
		if(currentDay <= (alldays - relLocalMax) && currentDay >= relLocalMin){
			n.hidden = 0;
			
		}else{
			n.hidden = 1;
		}
		});
		
		var starthere = parseInt(currentDay) + parseInt(mindate);
		var stophere = starthere + 1;
		
		// hide edges
		this.iterEdges(function(e){
			var curWeight = getWeightInYears(e['attr']['attributes'],starthere, stophere);

			if(curWeight == ""){
				//e.hidden = 1;
				e.weight = 1; // set weight to 1 as default
			}else{
				e.weight = curWeight;
				//e.hidden = 0;
			}
	  	});
		return this.position(0,0,1).draw();
	};

	// bind the methods to buttons
	document.getElementById('randomlayout').addEventListener('click',function(){
		sigInst.myRandomLayout();
	},true);	
	document.getElementById('circlayout').addEventListener('click',function(){
		sigInst.myCircularLayout();
	},true);
	document.getElementById('frlayout').addEventListener('click',function(){
		sigInst.myFRLayout(100,sigInst._core);
	},true);
	
	function updateButtonLabel(id,newvalue){
		if(slider.getValue() == 0 && newvalue == -1){
			document.getElementById(id).value="N/A";
		}else if(slider.getValue() == (maxdate-mindate) && newvalue == +1){
			document.getElementById(id).value="N/A";
		}else{
			var newcalcDate = parseInt(slider.getValue()) + parseInt(mindate) + parseInt(newvalue);
			var finalvalue = "show "+newcalcDate;
			document.getElementById(id).value=finalvalue;
		}	
	}
	
	document.getElementById('PlayAnimation').addEventListener('click',function(){
		currentDay = slider.getValue();
		setInterval(function(){sigInst.HideWrongTimeNodes(+1)},500);
	},true);
	document.getElementById('Day-').addEventListener('click',function(){
		sigInst.HideWrongTimeNodes(-1);
		updateButtonLabel("Day+",+1);
		updateButtonLabel("Day-",-1);
	},true);
	document.getElementById('Day+').addEventListener('click',function(){
		sigInst.HideWrongTimeNodes(+1);
		updateButtonLabel("Day+",1);
		updateButtonLabel("Day-",-1);
	},true);	
}