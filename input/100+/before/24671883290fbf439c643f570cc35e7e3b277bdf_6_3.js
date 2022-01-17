function(layoutName) {

		var obj, button;

		gs.clearLayout();

		for (button in GameState.layouts[currentMode][layoutName]) {

			obj = GameState.layouts[currentMode][layoutName][button];

			i = layout.length;

			layout.push({});



			layout[i].x = width/2 + obj.x;

			if (obj.valign)

				layout[i].y = height/2 + obj.y;

			else

				layout[i].y = obj.y;



			if (obj.img) {

				layout[i].img = gs.getImage(obj.img);

				if (!obj.halign)

					layout[i].x -= layout[i].img.width/2;

				layout[i].y -= layout[i].img.height/2;

			}

			if (obj.txt) {

				layout[i].size = obj.size;

				gs.ctx.font=layout[i].size+"px Arial";

				layout[i].txt = obj.txt;

				if (!obj.halign)

					layout[i].x -= gs.ctx.measureText(layout[i].txt).width/2;

				layout[i].y -= layout[i].size/2;

				if (obj.color)

					layout[i].color = obj.color;

				else

					layout[i].color = "#FFFFFF";

				layout[i].textbox = obj.textbox;

			}



			// some objects may not need any hitboxes. otherwise, do hitbox math

			if (obj.hitbox) {

				layout[i].hitbox = {};

				if (typeof(obj.hitbox) === 'object') {

					layout[i].hitbox = obj.hitbox;

				}

				else {

					layout[i].hitbox.x = layout[i].hitbox.w = layout[i].x;

					layout[i].hitbox.y = layout[i].hitbox.h = layout[i].y;

					layout[i].hitbox.value = obj.hitbox;

					if (layout[i].img) {

						layout[i].hitbox.w += layout[i].img.width;

						layout[i].hitbox.h += layout[i].img.height;

					}

					if (layout[i].txt) {

						layout[i].hitbox.w += gs.ctx.measureText(layout[i].txt).width;

						layout[i].hitbox.h += layout[i].size;

					}

				}

			}

		}

	}