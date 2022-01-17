function (err, people) {
    var activeLetters = {};
    var letterPeople = [];
    people.sort(function (a,b) { return (a.family > b.family ? 1 : (b.family > a.family ? -1 : 0));});	
    for (var p in people) {
	activeLetters[people[p].family[0].toUpperCase()]++;
	if (letter != 'all' && people[p].family[0].toLowerCase() == letter.toLowerCase()) {
	    letterPeople.push(people[p]);
	}
    }
    if (letter == 'all') {
	letterPeople = people;
    }
    switch (req.params.format) {
      // When json, generate suitable data
      case 'json':
        res.send(letterPeople);
	break;
      default:
        res.render('people/index.ejs', { locals: { activeLetters: activeLetters, letter: letter, people: letterPeople, title: 'People — ' + letter}});
    }
  }