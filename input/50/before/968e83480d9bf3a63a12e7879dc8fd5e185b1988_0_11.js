function() {
      expect(db.logError).toHaveLogged({
        message: message,
        error: error,
        code: code
      });
      expect(db.logActivity).not.toHaveBeenCalled();
    }