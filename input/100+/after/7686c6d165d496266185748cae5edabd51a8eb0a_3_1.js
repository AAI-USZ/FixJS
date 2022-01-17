function(l){

	var number = prompt("How many " + l + " do you want?");

	window[l] = number;

	if (stage.get("#"+l+"Number").length==0)

	{

		var landText = new Kinetic.Text({

		  x: 70,

		  y: landsVisual[l],

		  text: number + " " + l,

		  fontSize: 12,

		  fontFamily: "Calibri",

		  textFill: "green",

		  align: "center",

		  verticalAlign: "middle",

		  id: l+"Number"

		});

		layer.add(landText);

		stage.get("#"+l+"Number")[0].attrs.number = number;

	}

	else

	{

		stage.get("#"+l+"Number")[0].setText(number + " " + l);

		stage.get("#"+l+"Number")[0].attrs.number=number;

	}

	layer.draw();

}