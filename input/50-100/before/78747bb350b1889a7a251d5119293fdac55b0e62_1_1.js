function (position, rotation, vertices, update, render) {

		"use strict";

		this._super(position, rotation);

		

		this.vertices = vertices || [ 5,5, 100,50, 50,100, 10,90 ]; 

		if (update) {

			this.update = update;

		}

		

		if (render) {

			this.render = render;

		}

	}