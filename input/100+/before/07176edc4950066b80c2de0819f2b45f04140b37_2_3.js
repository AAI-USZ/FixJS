function (TextManager) {

	"use strict";

	

	module("textBuffer");



	test("defaults", 7, function() {

		var textManager = new TextManager();

		

		equal(textManager.lineHeight, 10, "default lineHeight");

		equal(textManager.padding, 3, "default padding");

		

		textManager.writeText("foobar");

		

		equal(textManager.items.length, 1, "text added to buffer");

		equal(textManager.item(0).text, "foobar", "text");

		equal(textManager.item(0).x, 3, "default x");

		equal(textManager.item(0).y, 13, "default y");

		equal(textManager.item(0).font, "normal 12px sans-serif", "default font");

	});



	test("write with full options", 5, function() {

		var textManager = new TextManager();

		

		textManager.writeText({text: "foo, bar", x: 1, y:1, font: "bold 14px"});

		

		equal(textManager.items.length, 1, "text added to buffer");

		equal(textManager.item(0).text, "foo, bar", "text");

		equal(textManager.item(0).x, 1, "x");

		equal(textManager.item(0).y, 1, "y");

		equal(textManager.item(0).font, "bold 14px");

	});



	test("add text buffer", 1, function() {

		var textManager = new TextManager();

		textManager.writeText({text: "foo"});

		equal(textManager.item(0).text, "foo", "text added to buffer");

	});



	test("add multiple text buffer", 2, function() {

		var textManager = new TextManager();

		textManager.writeText("foo");

		textManager.writeText("bar");

		

		equal(textManager.item(0).text, "foo", "text added to buffer");

		equal(textManager.item(1).text, "bar", "text added to buffer");

	});



	test("text buffer cleared by renderText", 1, function() {

		var noop = function() {},

			textManager = new TextManager();

			

		textManager.writeText("foo");

		textManager.render({ context: { fillText: noop }}, 0);

		equal(textManager.items.length, 0, "buffer cleared by renderText");

	});



	test("write text buffer", 1, function() {

		var textManager = new TextManager();

		textManager.writeText("foo");

		equal(textManager.item(0).text, "foo", "text added to buffer");

	});



}