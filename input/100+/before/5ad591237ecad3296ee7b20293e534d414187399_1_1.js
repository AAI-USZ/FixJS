function() {
	"use strict";

	oj.namespace("oj.util");

	/**
	 * @namespace
	 * 
	 * Utility methods for manipulating strings.
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
			return (obj !== undefined) &&
				(obj !== null) &&
				(typeof obj === "string");
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

	// Decorate all String objects with the trim method if it has not been defined already.
	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/, "");
		};
	}
}