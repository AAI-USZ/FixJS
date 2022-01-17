function start() {
	var goldTop = 10;
	var goldLeft = 254;
	var silverTop = 26;
	var silverLeft = 211;
	var bronzeTop = 35;
	var bronzeLeft = 302;
	var tolerance = 15;

	var positions = $.shuffle([{pos: {top: 55, left: -70}, z: 4}, {pos: {top: 48, left: -50}, z: 3}, {pos: {top: 41, left: 0}, z: 2}, {pos: {top: 34, left: -20}, z: 1}]);

	var time_start = +new Date();

	$( "#cokeCan_Red" ).draggable({containment: "parent", delay: 100, stack: ".cokeCan"})
	                   .css("left", positions[0].pos.left)
	                   .css("top", positions[0].pos.top)
	                   .css("z-index", positions[0].z)
                       .animate({ left: '+=100px' }, 1000, function() {
                       	 positions[0].pos.left += 100;
                       });

	$( "#cokeCan_Gold" ).draggable({containment: "parent", delay: 100, stack: ".cokeCan"})
	                   .css("left", positions[1].pos.left)
	                   .css("top", positions[1].pos.top)
	                    .css("z-index", positions[1].z)
	                    .animate({ left: '+=100px' }, 2000, function() {
                       	 positions[1].pos.left += 100;
                       });
	$( "#cokeCan_Silver" ).draggable({containment: "parent", delay: 100, stack: ".cokeCan"})
	                      .css("left", positions[2].pos.left)
	                      .css("top", positions[2].pos.top)
 	                      .css("z-index", positions[2].z)
	                      .animate({ left: '+=100px' }, 2000, function() {
                       	    positions[2].pos.left += 100;
                          });

//	$( "#cokeCan_Bronze" ).draggable({containment: "parent", delay: 100, stack: ".cokeCan"})
    $( "#cokeCan_Bronze" ).css("left", positions[3].pos.left)
	                      .css("top", positions[3].pos.top)
					      .css("z-index", positions[3].z)
	                      .animate({ left: '+=100px' }, 1000, function() {
                       	     positions[3].pos.left += 100;
                       	     $( "#cokeCan_Bronze" ).animate({ left: bronzeLeft, top: bronzeTop}, 1000);
                          });

	$( "#droppable" ).droppable({
			drop: function( event, ui ) {
				
				var countfield = $("#CAPTCHA_Clicks");
    			countfield.val(1 + parseInt(countfield.val()));

				var goldDone = false;
				var silverDone = false;
				// var bronzeDone = false;
				var bronzeDone = true;

				$("#cokeCan_Red").css("top", positions[0].pos.top)
				                 .css("left", positions[0].pos.left)
				                 .css("z-index", positions[0].z);

				if (parseInt($("#cokeCan_Gold").css("top")) >= goldTop - tolerance && 
				    parseInt($("#cokeCan_Gold").css("top")) <= goldTop + tolerance &&
				    parseInt($("#cokeCan_Gold").css("left")) >= goldLeft - tolerance && 
					parseInt($("#cokeCan_Gold").css("left")) <= goldLeft + tolerance) {

					$("#cokeCan_Gold").css("top", goldTop)
				                      .css("left", goldLeft)
				                      .draggable("destroy");				
				    goldDone = true;
				}

				if (!goldDone)
					$("#cokeCan_Gold").css("top", positions[1].pos.top)
				                      .css("left", positions[1].pos.left)
				                      .css("z-index", positions[1].z);

				if (parseInt($("#cokeCan_Silver").css("top")) >= silverTop - tolerance && 
				    parseInt($("#cokeCan_Silver").css("top")) <= silverTop + tolerance &&
				    parseInt($("#cokeCan_Silver").css("left")) >= silverLeft - tolerance && 
					parseInt($("#cokeCan_Silver").css("left")) <= silverLeft + tolerance) {

					$("#cokeCan_Silver").css("top", silverTop)
				                        .css("left", silverLeft)
				                        .draggable("destroy");
				    silverDone = true;
				}

				if (!silverDone)
					$("#cokeCan_Silver").css("top", positions[2].pos.top)
				                        .css("left", positions[2].pos.left)
				                        .css("z-index", positions[2].z);

				// if (parseInt($("#cokeCan_Bronze").css("top")) >= bronzeTop - tolerance && 
				//     parseInt($("#cokeCan_Bronze").css("top")) <= bronzeTop + tolerance &&
				//     parseInt($("#cokeCan_Bronze").css("left")) >= bronzeLeft - tolerance && 
				// 	parseInt($("#cokeCan_Bronze").css("left")) <= bronzeLeft + tolerance) {

				// 	$("#cokeCan_Bronze").css("top", bronzeTop)
				//                         .css("left", bronzeLeft)
				//                         .draggable("destroy");
				//     bronzeDone = true;
				// }

				// if (!bronzeDone)
				// 	$("#cokeCan_Bronze").css("top", positions[3].pos.top)
				//                         .css("left", positions[3].pos.left)
				//                         .css("z-index", positions[3].z);

				if (goldDone && silverDone && bronzeDone) {
					var time_end = +new Date();
					$("#CAPTCHA_Time").val(time_end - time_start);
					$("#CAPTCHA_Form").submit();		   
				}                   
			}
		});
}