function () {
  "use strict";

  // Show additional message (smaller than the main message)
  function addl_message(text) {
    document.getElementById("addl-message").textContent = text;
  }

  // Set the string shown by the message
  function message(text, sound) {
    document.getElementById("message").textContent = text;
    if (sound) {
      zap.play_sound(sound, $VOLUME);
    }
  }

  // Flash the screen by setting a class k on the body (which redefines the
  // background color for instance)
  function flash(k) {
    document.body.classList.add(k);
    window.setTimeout(function () {
      document.body.classList.remove(k);
    }, $FLASH_DUR_MS);
  }


  // Our custom cosmos

  var cosmos = zap.make_cosmos("cosmos");
  cosmos.vb = document.querySelector("svg").viewBox.baseVal;

  // Set the score
  var score;
  Object.defineProperty(cosmos, "score", { enumerable: true,
    get: function () { return score; },
    set: function (s) {
      if ((score % $NEW_LIFE) > (s % $NEW_LIFE)) {
        this.add_life();
      }
      score = s;
      document.getElementById("score").textContent = score.toString();
    } });
  cosmos.score = 0;

  // Setting a new level
  var level;
  Object.defineProperty(cosmos, "level", { enumerable: true,
    get: function () { return level; },
    set: function (l) {
      level = l;
      message($LEVEL.fmt(level), "message_sound");
      window.setTimeout(function () {
        message("");
        this.make_asteroids(Math.min(level,
        //this.make_asteroids(Math.min($ASTEROIDS_MIN + level - 1,
            $ASTEROIDS_MAX));
        this.init_player();
      }.bind(this), $READY_DUR_MS);
    } });

  // Add one life
  cosmos.add_life = function () {
    var life = this.make_ship(this.layers.lives);
    life.position(3 * life.r * this.layers.lives.sprites.length, 3 * life.r,
        270);
  };

  // Show a message to "press any key" after a short delay
  cosmos.any_key = function () {
    window.setTimeout(function () {
      addl_message($ANY_KEY);
      this.can_start = true;
    }.bind(this), $READY_DELAY_MS);
  };

  // Check if the player dies from a collision with an asteroid
  // TODO: or a bullet fired from an enemy ship
  cosmos.check_player_die = function (asteroid) {
    var asteroid = this.ship.collide_radius(this.layers.asteroids.sprites);
    if (asteroid) {
      this.ship.explode();
      delete this.ship;
      this.layers.lives.sprites[this.layers.lives.sprites.length - 1].explode();
      flash("explosion");
      if (this.layers.lives.sprites.length > 0) {
        window.setTimeout(function () {
          message($READY);
          window.setTimeout(function () {
            message("");
            this.init_player();
          }.bind(this), $READY_DUR_MS);
        }.bind(this), $READY_DELAY_MS);
      } else {
        window.setTimeout(function () {
          message($GAME_OVER, "game_over_sound");
          this.any_key();
        }.bind(this), $READY_DELAY_MS);
      }
    }
  };

  // Jump to hyperspace
  cosmos.hyperspace = function () {
    zap.play_sound("hyperspace_sound", $VOLUME);
    this.init_stars();
    this.ship.position(zap.random_int(0, this.vb.width),
      zap.random_int(0, this.vb.height), zap.random_int(0, 360));
    flash("hyperspace-{0}".fmt(zap.random_int(0, 5)));
  };

  // General initialization
  cosmos.init = function () {
    cosmos.init_controls();
    cosmos.init_stars();
    message($TITLE, "message_sound");
    cosmos.running = true;
    cosmos.any_key();
  };

  // Initialize keyboard events
  // TODO improve keyboard handling
  cosmos.init_controls = function () {
    document.addEventListener("keydown", function (e) {
      if (this.ship) {
        if (e.which === 32) {
          e.preventDefault();
          this.ship.fire();
        } if (e.which === 37) {
          e.preventDefault();
          this.ship.va = -$SHIP_VA;
        } else if (e.which === 38) {
          e.preventDefault();
          this.ship.acceleration = $SHIP_ACCELERATION;
        } else if (e.which === 39) {
          e.preventDefault();
          this.ship.va = $SHIP_VA;
        } else if (e.which === 40) {
          e.preventDefault();
        }
      }
    }.bind(this));
    document.addEventListener("keyup", function (e) {
      if (this.ship) {
        if (e.which === 32) {
          e.preventDefault();
        } else if (e.which === 37) {
          e.preventDefault();
          this.ship.va = 0;
        } else if (e.which === 38) {
          e.preventDefault();
          this.ship.acceleration = $SHIP_DECELERATION;
        } else if (e.which === 39) {
          e.preventDefault();
          this.ship.va = 0;
        } else if (e.which === 40) {
          e.preventDefault();
          this.hyperspace();
        }
      } else if (this.can_start) {
        e.preventDefault();
        cosmos.new_game();
      }
    }.bind(this));
  };

  // Initialize lives
  cosmos.init_lives = function () {
    for (var i = 0; i < $LIVES; ++i) {
      this.add_life();
    }
  };

  // Initialize the player ship for a new game, new level or after death
  // Also resets the asteroids so that the player has a safe zone to start with
  cosmos.init_player = function () {
    this.make_asteroids(this.layers.asteroids.sprites);
    this.ship = this.make_ship(this.layers.player);
    this.ship.position(this.vb.width / 2, this.vb.height / 2, 270);
    this.ship.velocity = 0;
    this.ship.max_velocity = $SHIP_V_MAX;
  };

  // Make a starry field
  cosmos.init_stars = function () {
    var bg = document.getElementById("background");
    zap.remove_children(bg);
    for (var i = 0, m = $STAR_DENSITY * this.vb.width * this.vb.height;
        i < m; ++i) {
      bg.appendChild($circle({ r: Math.random() * $STAR_RADIUS,
        cx: zap.random_int(0, this.vb.width),
        cy: zap.random_int(0, this.vb.height),
        "fill-opacity": Math.random() }));
    }
  };

  // Make a new asteroid, size 1, 2, or 3 (from smallest to largest)
  cosmos.make_asteroid = function (size) {
    var asteroid = zap.make_sprite($path(), this.layers.asteroids, ur_asteroid);
    asteroid.size = size;
    var r = window["$ASTEROID_{0}_R".fmt(size)];
    var r_amp = window["$ASTEROID_{0}_R_AMP".fmt(size)];
    var sectors = window["$ASTEROID_{0}_SECTORS".fmt(size)];
    asteroid.score = window["$ASTEROID_{0}_SCORE".fmt(size)];
    asteroid.debris = 2 * sectors;
    var points = [];
    asteroid.r = 0;
    for (var i = 0; i < sectors; ++i) {
      var th = i * (2 * Math.PI / sectors);
      var r = r + zap.random_int(-r_amp, r_amp);
      if (r > asteroid.r) {
        asteroid.r = r;
      }
      points.push([r * Math.cos(th), r * Math.sin(th)]);
    }
    asteroid.r_collide = r;
    asteroid.elem.setAttribute("d", "M{0}Z".fmt(points.map(function (p) {
      return p.join(",");
    }).join("L")));
    return asteroid;
  };

  // Make a new player ship
  cosmos.make_ship = function (layer) {
    var ship = zap.make_sprite($use("#ship"), layer, ur_ship);
    return ship;
  };

  // Start a new game
  cosmos.new_game = function () {
    message("");
    addl_message("");
    this.init_lives();
    this.can_start = false;
    this.level = 1;
  };

  // Start shaking with the given amplitude and duration (in milliseconds)
  cosmos.shake = function (amp, dur) {
    if (this.shaking) {
      window.clearTimeout(this.shaking.timeout);
    }
    this.shaking = { amp: amp, timeout: setTimeout(function () {
      delete this.shaking;
      this.layers.forEach(function (layer) {
        layer.removeAttribute("transform");
      });
    }.bind(this), dur) };
  }

  // Update the world on each tick: check destruction of asteroids or player,
  // shake the screen
  cosmos.updated = function (dt) {
    if (this.ship) {
      this.layers.lives.sprites.forEach(function (life) {
        life.position(life.x, life.y,
          zap.rad2deg(Math.atan2(this.ship.y - life.y, this.ship.x - life.x)));
      }, this);
      this.ship.sprites.forEach(function (bullet) {
        if (bullet.is_bullet) {
          var asteroid = bullet.collide_radius(this.layers.asteroids.sprites);
          if (asteroid) {
            bullet.remove();
            this.score += asteroid.score;
            asteroid.split();
            if (!this.layers.asteroids.sprites.some(function (a) {
              return !a.hasOwnProperty("ttl");
            })) {
              this.ship.remove();
              ++this.level;
            }
          }
        }
      }, this);
      this.check_player_die();
    }
    if (this.shaking) {
      this.layers.forEach(function (layer) {
        layer.setAttribute("transform", "translate({0}, {1}) rotate({2})".fmt(
            zap.random_int_around(this.shaking.amp),
            zap.random_int_around(this.shaking.amp),
            zap.random_int_around(this.shaking.amp)));
      }, this);
    }
  };


  var ur_sprite = Object.create(zap.sprite);

  // Sprites in this game wrap around the screen (except the enemy space ship)
  ur_sprite.set_position = function () {
    var w = this.cosmos.vb.width;
    var h = this.cosmos.vb.height;
    this.x = (this.x + w) % w;
    this.y = (this.y + h) % h;
  };

  // Both asteroids and spaceships may explode, leaving some debris behind
  // Set the debris property of the sprite to leave debris
  // Set the shake_amp and shake_dur properties to shake the screen as well
  // Set the explision_sound property for sound
  ur_sprite.explode = function () {
    zap.play_sound(this.explosion_sound, $VOLUME);
    for (var i = 0; i < this.debris; ++i) {
      var debris = zap.make_particle($use("#debris"), this.parent,
          zap.random_int_amp($DEBRIS_TTL, $DEBRIS_TTL_AMP), ur_sprite);
      var th = Math.random() * 2 * Math.PI;
      debris.position(this.x + this.r_collide * Math.cos(th),
          this.y + this.r_collide * Math.sin(th), zap.random_int(0, 360));
      debris.vx = zap.random_int_signed($ASTEROID_V_MIN, $ASTEROID_V_MAX);
      debris.vy = zap.random_int_signed($ASTEROID_V_MIN, $ASTEROID_V_MAX);
      debris.va = zap.random_int_signed($ASTEROID_V_MIN, $ASTEROID_V_MAX) /
        $ASTEROID_VA_RATE;
    }
    this.cosmos.shake(this.shake_amp, this.shake_dur);
    this.remove();
  };


  var ur_asteroid = Object.create(ur_sprite);

  ur_asteroid.explosion_sound = "explosion_asteroid_sound";
  ur_asteroid.shake_amp = $SHAKE_AMP;
  ur_asteroid.shake_dur = $SHAKE_DUR_MS;

  // Asteroids split into two smaller asteroids with perpendicular direction and
  // higher speed
  ur_asteroid.split = function () {
    if (this.size > 1) {
      var a1 = this.cosmos.make_asteroid(this.size - 1);
      a1.position(this.x, this.y);
      a1.vx = this.vx * $SPEEDUP;
      a1.vy = -this.vy * $SPEEDUP;
      a1.va = this.va * $SPEEDUP;
      var a2 = this.cosmos.make_asteroid(this.size - 1);
      a2.position(this.x, this.y);
      a2.vx = -this.vx * $SPEEDUP;
      a2.vy = this.vy * $SPEEDUP;
      a2.va = -this.va * $SPEEDUP;
    }
    this.explode();
  };

  // Make n asteroids
  cosmos.make_asteroids = function (n) {
    var r = Math.floor(Math.min(this.vb.width, this.vb.height) / 4);
    if (typeof n === "number") {
      zap.remove_sprites(this.layers.asteroids);
      for (var i = 0; i < n; ++i) {
        var asteroid = this.make_asteroid(3);
        var th = Math.random() * 2 * Math.PI;
        var rr = zap.random_int(r, r * 2);
        asteroid.position(this.vb.width / 2 + rr * Math.cos(th),
          this.vb.height / 2 + rr * Math.sin(th));
        asteroid.vx = zap.random_int_signed($ASTEROID_V_MIN, $ASTEROID_V_MAX);
        asteroid.vy = zap.random_int_signed($ASTEROID_V_MIN, $ASTEROID_V_MAX);
        asteroid.va = zap.random_int_signed($ASTEROID_V_MIN, $ASTEROID_V_MAX) /
          $ASTEROID_VA_RATE;
      }
    } else {
      n.forEach(function (asteroid) {
        var th = Math.random() * 2 * Math.PI;
        var rr = zap.random_int(r, r * 2);
        asteroid.position(this.vb.width / 2 + rr * Math.cos(th),
          this.vb.height / 2 + rr * Math.sin(th));
      }, this);
    }
  };


  var ur_ship = Object.create(ur_sprite);

  ur_ship.explosion_sound = "explosion_ship_sound";
  ur_ship.debris = $SHIP_DEBRIS;
  ur_ship.r = $SHIP_R;
  ur_ship.r_collide = $SHIP_R_COLLIDE;

  ur_ship.set_position = function () {
    ur_sprite.set_position.call(this);
    if (this.acceleration > 0 && Math.random() < $PLUME_P) {
      var p = zap.make_particle($use("#plume"), this, $PLUME_TTL, ur_sprite);
      p.position(this.x + zap.random_int_around(this.r),
          this.y + zap.random_int_around(this.r),
          this.a + 180 + zap.random_int_around($PLUME_ARC));
      p.velocity = $PLUME_VELOCITY;
    }
  };

  ur_ship.fire = function () {
    var now = Date.now();
    if (now - this.last_shot < $FIRE_RATE) {
      return;
    }
    this.last_shot = now;
    var bullet = zap.make_particle($use("#bullet"), this,
        $BULLET_RANGE / $BULLET_V, ur_sprite);
    bullet.is_bullet = true;
    bullet.r = bullet.r_collide =
      parseFloat(document.getElementById("bullet").getAttribute("r"));
    var th = zap.deg2rad(this.a);
    bullet.x = this.x + this.r * Math.cos(th);
    bullet.y = this.y + this.r * Math.sin(th);
    bullet.vx = $BULLET_V * Math.cos(th);
    bullet.vy = $BULLET_V * Math.sin(th);
    zap.play_sound("bullet_sound", $VOLUME);
  };

  cosmos.init();

}