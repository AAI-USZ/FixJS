function() {
      expect(logging.log).toHaveLogged({
        message: 'Link hit',
        linkID: transformLinkID
      });
    }