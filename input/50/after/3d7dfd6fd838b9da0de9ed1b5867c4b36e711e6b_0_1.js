function() {
  return (navigator.language || navigator.browserLanguage 
      || navigator.userLanguage || 'en').substr(0, 2).toLowerCase();
}