function() {
	"use strict";

	oj.namespace("oj.util");

	/**
	 * @namespace
	 * 
	 * Utility methods for handling strings.
	 */
	oj.util.strings = {
		/**
		 * Determines whether or not the specified input is a string.
		 * 
		 * @param {Object} obj The input to examine.
		 * 
		 * @returns {Boolean} Returns true if the specified input is not undefined, not null and is
		 *                    a string, otherwise false.
		 */
		isString: function(obj) {
			return (undefined !== obj) && (null !== obj) && ("string" === typeof obj);
		},

		/**
		 * Determines whether or not the specified input is a non blank string.
		 * 
		 * @param {Object} obj The input to examine.
		 * 
		 * @returns {Boolean} Returns true if the specified input is not undefined, not null, is a
		 *                    string and has at least one non whitespace character, otherwise false.
		 */
		isNotBlank: function(obj) {
			return oj.util.strings.isString(obj) && /\S/.test(obj);
		},

		/**
		 * Determines whether or not the specified input is a blank string.
		 * 
		 * @param {Object} obj The input to examine.
		 * 
		 * @returns {Boolean} Returns true if the specified input is undefined, null, is a not a
		 *                    string or has at only whitespace characters, otherwise false.
		 */
		isBlank: function(obj) {
			return !oj.util.strings.isNotBlank(obj);
		}
	};
}