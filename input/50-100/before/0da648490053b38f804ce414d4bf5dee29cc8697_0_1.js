function(query) {
            if (query)
            {
                if (this.hashTagSearchRE.test(query))
                {
                    this.query = this.formatHashTagQuery(query);
                }
                else
                {
                    this.query = this.formatSearchQuery(query);
                }
            }
            else
            {
                this.query = false;
            }

            this.clear(false);
            this.requestData();
        }