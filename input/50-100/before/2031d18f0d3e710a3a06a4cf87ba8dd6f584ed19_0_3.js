function RadiusEffect(dot, duration, options) {
        this.refresh = __bind(this.refresh, this);
        RadiusEffect.__super__.constructor.call(this, dot, duration, options);
        this.startRadius = options.startRadius || 6;
        this.endRadius = options.endRadius || 8;
      }