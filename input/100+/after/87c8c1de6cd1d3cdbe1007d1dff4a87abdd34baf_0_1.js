function()
	{
        this.element.addEvents({
            keydown: this.handleKey.bind(this),
            keyup: this.handleText.bind(this),
            focus: this.handleText.bind(this),
            blur: this.blur.bind(this)
        }).setStyle('width', this.options.width - 3);

        var self = this;

        this.request =  new Request.JSON(
		{
			url: this.requestUrl,
			method: "get",
            timeout: 30000,
            link: 'cancel',
            onSuccess: function(data)
			{
				if(data && data.length)
				{
					// filter already set tags // by PsiTrax
					var choosenTags = self.options.mooTagify.getTags();
					data = Array.filter(data, function(option)
					{
						return !choosenTags.contains(option);
					});
				}

                if (data && data.length)
				{
                    self.show();
                    self.addOptions(data);
                }
                else
				{
                    self.clearOptions();
                    self.hide();
                }
            }
        });
    }