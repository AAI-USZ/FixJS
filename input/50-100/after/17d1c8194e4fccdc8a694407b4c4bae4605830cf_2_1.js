function getKeywords(signal) {
	  var keys = signal.title.toLowerCase().split(" ").concat(signal.text.toLowerCase().split(" "));

	  var except = "о как где в и у за до том не бы а куда между где там тут про к по ни но на да нет с что and or do in on if does with".split(" ");
	  return _.difference(keys, except);
	}