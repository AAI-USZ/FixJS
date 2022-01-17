function() {
          setupTests.bind(this).call()

          var getUserApiResponses = ApiResponse['/account/verify_credentials'];
          this.instapaperClient._makeRequest = stubFn(null, getUserApiResponses.success);
          this.errorClient._makeRequest = stubFn(getUserApiResponses.error);
        }