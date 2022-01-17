function(){

		var $pre = $("<pre>");

		$pre.text("Loading...");

		this.getResponseContent(function(data){

			console.log(arguments)

			$pre.text("Content: \n"+data);

		});

		return $pre[0];

	}