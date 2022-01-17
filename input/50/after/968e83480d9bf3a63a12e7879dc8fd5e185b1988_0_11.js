function() {
      expect(logging.error).toHaveLogged({
        message: message,
        error: error,
        code: code
      });
      expect(logging.log).not.toHaveBeenCalled();
    }