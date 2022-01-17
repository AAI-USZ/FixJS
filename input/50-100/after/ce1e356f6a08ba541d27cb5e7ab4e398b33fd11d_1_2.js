function() {
          setupTests.bind(this).call()

          var getUserApiResponses = ApiResponse['/account/verify_credentials'];
          this.instapaperClient._oauthClient.get = stubFn(null, getUserApiResponses.success);
          this.errorClient._oauthClient.get = stubFn(getUserApiResponses.error);
        }