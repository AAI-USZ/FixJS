function() {
			var alpha,
				self = this,
				alphaRange = self._alphaRange,
				alphaValue = self._alphaValue;

			alpha = +alphaRange.val();
			self._color.alpha( alpha );
			alphaValue.html( alpha.toPrecision(1) );
			self._dispatchColorChange();
		}