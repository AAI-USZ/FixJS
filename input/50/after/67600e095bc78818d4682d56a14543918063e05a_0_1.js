function pushResourceData(contentProvider)
        {
            if (!resources[contentProvider.contentURL()])
                resources[contentProvider.contentURL()] = this._makeResource(contentProvider);
        }