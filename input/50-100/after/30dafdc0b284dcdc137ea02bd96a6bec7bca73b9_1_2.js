function() {
    ProjectCheck.checkProjects();

    expect(ajaxRequests.length).toEqual(1);
    expect(ajaxRequests[0].url).toBe('/?');
    expect(ajaxRequests[0].requestHeaders.Accept).toContain('application/json');
  }