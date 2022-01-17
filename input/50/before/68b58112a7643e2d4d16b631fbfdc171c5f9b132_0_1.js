function() {
        this.device = DEVICE_TYPE;
        // Call init at the beginning of every page load. It create a
        // Localytics session object
        localyticsSession.init(localyticsAppId);
    
        // Call this immediately after init. It either creates a new session or
        // reattaches to the previous session depending on how long has passed.
        // Also starts the polling for computing session duration
        localyticsSession.open();
        
        // Uploads all stored Localytics data. Call this after opening a session to
        // get the most accurate session information. If the application expects
        // very long running sessions it would be prudent to upload during the
        // session as well.
        localyticsSession.upload();
        // Upload Localytics data every minute.
        this.uploadTimer = setInterval(localyticsSession.upload, 60000);
    }