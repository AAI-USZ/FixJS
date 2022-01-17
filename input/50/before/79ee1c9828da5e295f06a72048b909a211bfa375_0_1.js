function(ts)
      {
          var pos = ts.GetPosition();
          this.camera.Set(pos.x, pos.y, pos.z);
      }