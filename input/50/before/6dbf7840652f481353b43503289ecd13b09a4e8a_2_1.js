function( beaconUrl ){

	$('body').append(

		$( '<img />' ).attr({

			'src' : beaconUrl,

			'width' : 0,

			'height' : 0

		})

	);

}