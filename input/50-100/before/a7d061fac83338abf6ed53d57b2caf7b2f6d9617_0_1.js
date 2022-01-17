function isInView(elem, up)

	{

		if (!elem && elem.length == 0) return false;

		var margin = 60;

		var top = 56 + margin;

		var bottom = $('#center').height() + top - margin*2;

		

		if (up)

			return elem.offset().top > top;

		else

			return (elem.offset().top + elem.height()) < bottom;

	}