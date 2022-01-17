function(movement) {
       var width = this._canvas.clientWidth;
       var height = this._canvas.clientHeight;

       var start = new Cartesian2();
       start.x = (2.0 / width) * movement.startPosition.x - 1.0;
       start.y = (2.0 / height) * (height - movement.startPosition.y) - 1.0;
       start = start.normalize();

       var end = new Cartesian2();
       end.x = (2.0 / width) * movement.endPosition.x - 1.0;
       end.y = (2.0 / height) * (height - movement.endPosition.y) - 1.0;
       end = end.normalize();

       var startTheta = Math.acos(start.x);
       if (start.y < 0) {
           startTheta = CesiumMath.TWO_PI - startTheta;
       }
       var endTheta = Math.acos(end.x);
       if (end.y < 0) {
           endTheta = CesiumMath.TWO_PI - endTheta;
       }
       var theta = endTheta - startTheta;

       var camera = this._camera;
       var rotation = Quaternion.fromAxisAngle(camera.direction, theta).toRotationMatrix();
       camera.up = rotation.multiplyByVector(camera.up);
       camera.right = camera.direction.cross(camera.up);
   }