function(){var a=0;this.autoStart&&!this.running&&this.start();if(this.running){var b=Date.now(),a=0.0010*(b-this.oldTime);this.oldTime=b;this.elapsedTime=this.elapsedTime+a}return a};THREE.Color=function(a){a!==void 0&&this.setHex(a);return this}