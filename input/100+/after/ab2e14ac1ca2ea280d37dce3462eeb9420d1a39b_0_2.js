function(evt) {

	

		var columns = planet1.columns;

	

		if (gameMode == REBUILD) {

			if (mouseInThreshold) {

				if (buildMode == TOWER) {

					if (planet1.isBlockEmpty(mouseColumn, mouseLevel)) {

						columns[mouseColumn][mouseLevel] = 1;

						updateMousePosition(evt);

					}

				}

				else if (buildMode == CANNON) {

					if (canBuildCannon(mouseColumn)) {

						var cannonPosition = columnToCoords(2+mouseColumn, (BLOCK_WIDTH) +PLANET_RADIUS);

						cannonPosition.add(planet1.position);

						

						cannonList.push(cannonPosition);

						cannonColumns.push(mouseColumn);

						

						for (var i=mouseColumn; i < mouseColumn + 4; i++) {

							for (var j=0; j < MAX_LEVELS; j++) {

								columns[i][j] = 2;

							}

						}

					}

				}

				

			}

		}

		else if (gameMode == WAR) {

			// shot a missile

			if (!shooting && isCannonSelected()) {

				shooting = true;

				

				// repeated?

				var mousePos = new Point(evt.clientX - canvasLeft, evt.clientY - canvasTop);

				

				

				

				// Shoot a missile from the selected cannon

				var missilePos = columnToCoords(2+cannonColumns[selectedCannon], PLANET_RADIUS + (4*BLOCK_WIDTH));

									

				// direction

				var cp = columnToCoords(2+cannonColumns[selectedCannon], (BLOCK_WIDTH) +PLANET_RADIUS);



				var h = Math.sqrt(Math.pow(mousePos.y - cp.y, 2) + 

								  Math.pow(mousePos.x - cp.x, 2));

				

				var missileDir = new Point((mousePos.x - cp.x)/h,

										   (mousePos.y - cp.y)/h);

										

				

				missiles.push(new Missile(missilePos, missileDir)); //new Point(x, y));

				

				

				

			}

		}

	

	}