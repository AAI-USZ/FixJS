function startup() {
  ad_number=1;
  url = window.location.host;
  url.replace('www.','');
  chrome.extension.sendMessage({action: "request_startup_info", "url": url });
}