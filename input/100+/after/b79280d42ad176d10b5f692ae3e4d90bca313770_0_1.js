function () {
	/*var artefactname = window.location.search.replace("?","")
	if (!artefactname) 
		$("#graphicview").append($("<strong>").html("<br/>No artefact name given in URL"))
	else {
		$("#graphiccontent").
			append($("<div>").attr({id : "graphics"}).
				append($("<div>").attr({id : "svgwrapper"}).svg()).
				append($("<div>").attr({id : "imagewrapper"}))).
			append($("<div>").attr({id : "mapwrapper"}))
		loadImage(artefactname)
		loadAreas(artefactname)
		
	}*/
	path = window.location.search.replace("?","")
	$("#selectionview").children().each(function(i){
		if (i > 0) $(this).width((100 / ($(this).parent().children().size() - 1) - 0.5) + "%")
	})
	$("#path").text(path)
	if (false && path == "") {
		//$("#selectionview .viewinfo").append($("<b>").addClass("noSelInfo").text("No contribution selected"))
	} else {
		var splitp = path.split("/")
		if (splitp.length > 1)
			document.title = splitp[1]
		else
			document.title = splitp[0]
		$.ajax({url: "../" + path + "/index.json",
				dataType: 'json',
				success:  function(data) {
					FileExplorer.init(path, data)
					$('.default').dropkick({change : function(value, label){
						CExplorers[this.attr("name")].populate(path,data,value)
					}});
					CExplorers["sel1"].populate(path,data,"languages")
					CExplorers["sel2"].populate(path,data,"technologies")
					CExplorers["sel3"].populate(path,data,"terms")
				},
				error: function(s) {
					if (s.status == 404) 
						$("#selectionview .viewinfo").append($("<b>").addClass("noSelInfo").text("" + path + " not found."))
				}
			});
	}
	$("#sel1").val("languages")
	$("#sel2").val("technologies")
	$("#sel3").val("terms")
	/*tree.setImagePath("./imgs/");
	tree.enableCheckBoxes(false);
	tree.enableTreeImages(false);
	tree.loadXML("foo.xml");
	tree._hAdI = true;
	tree.attachEvent("onOpenStart", function(id,state){if (state < 0) {tree.insertNewChild(id,id+100,"New Node 2",0,0,0,0,"")};return true});
	//$("body").click(function(){(tree.insertNewChild(1,4,"New Node 2",0,0,0,0,""))});*/
}