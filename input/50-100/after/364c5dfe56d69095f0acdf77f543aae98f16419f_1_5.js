function(f,g,h,i){f.beginPath();this.renderShape(f,h);f.closePath();
f.clip();f.globalAlpha=i.altImageOpacity||i.fillOpacity;f.drawImage(g,0,0,h.owner.scaleInfo.width,h.owner.scaleInfo.height);
}