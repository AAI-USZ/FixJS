function noRespContent(e)
    {
    if (hasClass(e.target, 'no-content'))
      {
      this.response.page.content = '';
      }
    }