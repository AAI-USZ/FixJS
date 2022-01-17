function update() {

		if ( selected ) {

			selected.position.x = positionX.getValue();
			selected.position.y = positionY.getValue();
			selected.position.z = positionZ.getValue();

			selected.rotation.x = rotationX.getValue();
			selected.rotation.y = rotationY.getValue();
			selected.rotation.z = rotationZ.getValue();

			selected.scale.x = scaleX.getValue();
			selected.scale.y = scaleY.getValue();
			selected.scale.z = scaleZ.getValue();

			signals.objectChanged.dispatch( selected );

		}

	}