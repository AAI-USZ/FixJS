function()
    {
      if (!this.$$instance)
      {
        this.$$allowconstruct = true;
        this.$$instance = new this();
        delete this.$$allowconstruct;
      }

      return this.$$instance;
    }