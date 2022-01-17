function (position, rotation, vertices, update, render) {

		"use strict";

		this._super(position, rotation);

		//110 wide

		//106.5 tall

		this.vertices = vertices || [

			113-180, 283-176.5, 

			70-180, 156-176.5, 

			180-180, 70-176.5, 

			290-180, 156-176.5, 

			250-180, 283-176.5

		];

		

		if (update) {

			this.update = update;

		}

		

		if (render) {

			this.render = render;

		}

	}