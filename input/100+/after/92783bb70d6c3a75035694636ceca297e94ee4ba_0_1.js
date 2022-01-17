function randomEvents( min, max, uidsuffix )
{
	if( !min ) min = 50;
	if( !max ) max = 800;
	if( !uidsuffix ) uidsuffix = '';
	
	var mins		= ['00','15','30','45'];
	var durations	= [15,15,15,15,30,30,30,30,30,45,45,45,45,45,60,60,60,60,60,60,90,120,165,210,245,300,600];
	var colors		= [ null, null, null, null, null, null, null, null, null, null, '#dddddd', '#7E0000', '#00630F', '#00630F' ];
	var notes		= [
		'Meeting',
		'Lunch',
		'Client',
		'Dentist Appointment',
		'Haircut',
		'Dinner',
		'Meeting with Boss',
		'Flight',
		'The big game',
		'Eye exam',
		'Doctor Appointment',
		'Take the car in for a service',
		'Walk the dog',
		'The cake is a lie',
		'Party'
	];
	var events 		= [], dayadd, hour, begins;
	
	for( var e=0; e<randomBetween(min,max); e++ ){
		
		dayadd		= randomBetween(-21,21);
		hour		= randomBetween(3,20);
		begins		= $.cal.date().addDays(dayadd).format('Y-m-d')+' '+( hour < 10 ? '0'+hour : hour )+':'+randomFrom(mins)+':00';
		
		events[e] = {
			uid		: e+uidsuffix,
			begins	: begins,
			ends	: $.cal.date(begins).addMinutes(randomFrom(durations)),
			notes	: randomFrom(notes),
			color	: randomFrom(colors)
		};
	}
	
	return events;
}