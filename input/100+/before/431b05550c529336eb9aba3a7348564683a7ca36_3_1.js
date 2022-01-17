function() {

		var sorted = this.members.sort();

		var ops     = 0;

		var length = sorted.length;

		var operator = '';

		var voice    = '';

		var member   = false;

		$(this.header).update(length+' members');

		this.clear();

		for (var i = 0 ; i < length ; i++) {

			member = sorted[i];

			operator = member.operator != undefined && member.operator ? 'operator' : '';

			if (operator == 'operator') {

				ops ++;

			}

			voice = member.voice != undefined && member.voice ? 'voice' : '';

			new Insertion.Bottom($(this.content), '<li class="member '+operator+voice+'" id="'+member.content+'">'+member.who+'</li>');

		}

		if (ops) {

			$(this.header).update($(this.header).innerHTML + ', '+ops+' operator(s)');

		}

	}