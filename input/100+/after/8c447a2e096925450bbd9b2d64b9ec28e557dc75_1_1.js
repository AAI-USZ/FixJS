function(blast) {
      var distX, distXS, distY, distYS, distanceWithBlast, force, forceX, forceY, previousRotation, previousStateX, previousStateY, rad, transform;
      previousStateX = this.transformX;
      previousStateY = this.transformY;
      previousRotation = this.transformRotation;
      if (this.velocityX > 1.5) {
        this.velocityX -= 1.5;
      } else if (this.velocityX < -1.5) {
        this.velocityX += 1.5;
      } else {
        this.velocityX = 0;
      }
      if (this.velocityY > 1.5) {
        this.velocityY -= 1.5;
      } else if (this.velocityY < -1.5) {
        this.velocityY += 1.5;
      } else {
        this.velocityY = 0;
      }
      if (blast != null) {
        distX = this.offsetLeft + this.transformX - blast.x;
        distY = this.offsetTop + this.transformY - blast.y;
        distXS = distX * distX;
        distYS = distY * distY;
        distanceWithBlast = distXS + distYS;
        force = 100000 / distanceWithBlast;
        if (force > 50) {
          force = 50;
        }
        rad = Math.asin(distYS / distanceWithBlast);
        forceY = Math.sin(rad) * force * (distY < 0 ? -1 : 1);
        forceX = Math.cos(rad) * force * (distX < 0 ? -1 : 1);
        this.velocityX = +forceX;
        this.velocityY = +forceY;
      }
      this.transformX = this.transformX + this.velocityX;
      this.transformY = this.transformY + this.velocityY;
      this.transformRotation = this.transformX * -1;
      if ((Math.abs(previousStateX - this.transformX) > 1 || Math.abs(previousStateY - this.transformY) > 1 || Math.abs(previousRotation - this.transformRotation) > 1) && ((this.transformX > 1 || this.transformX < -1) || (this.transformY > 1 || this.transformY < -1))) {
        transform = "translate(" + this.transformX + "px, " + this.transformY + "px) rotate(" + this.transformRotation + "deg)";
        this.style['MozTransform'] = transform;
        this.style['WebkitTransform'] = transform;
        this.style['msTransform'] = transform;
        return this.style['transform'] = transform;
      }
    }