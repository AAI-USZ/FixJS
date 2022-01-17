function() {
      expect(db.logActivity).toHaveLogged({
        message: 'Link hit',
        linkID: transformLinkID
      });
    }