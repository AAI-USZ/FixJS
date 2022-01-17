function(){

			var $field = $(this);



			var id = this.id;

			var $labels = $('label[for=' + id + ']').hide();

			var label = $labels.last().text();



			if (label.length > 0 && label[ label.length-1 ] == '*') {

				label = label.substring(0, label.length-1) + ' *';

			}



			$field[0].setAttribute('placeholder', label);

		}