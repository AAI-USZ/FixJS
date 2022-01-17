function() {
      spyOn(transform, 'uriToLinkID').andCallThrough();
      expect(transform.uriToLinkID).toHaveBeenCalledWith(url);
    }