function(e)
        {
            var $this = this.nodeName ? $(this) : $(e),
                check = /^.*##?.+/.test($this.val());

            if (check && !$this.hasClass("tripping"))
                $this.addClass("tripping");
            else if (!check && $this.hasClass("tripping"))
                $this.removeClass("tripping");
        }