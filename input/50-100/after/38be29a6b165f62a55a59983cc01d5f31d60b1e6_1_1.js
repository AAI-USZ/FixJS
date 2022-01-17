function() {
				var alpha,
				self = this,
				alphaRange = self._alphaRange,
				alphaValue = self._alphaValue;

			alpha = self._color.alpha();
			alphaRange.val( alpha );
			alphaValue.html( alpha.toPrecision(1) );
		}