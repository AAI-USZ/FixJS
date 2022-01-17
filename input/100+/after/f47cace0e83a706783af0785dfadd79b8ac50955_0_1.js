function( elem ) {

			if ( ( jQuery.isFunction( highlight ) && highlight( elem ) ) || ( highlight !== undefined && elem === highlight ) ) {

				return "<code class='" + highlightClass + "'>" + elem + "</code>";

			}

			return "<code>" + elem + "</code>";

		}