function(resp)
          {
          json = resp.page.pages;
          json.splice(0, 0, {url: '', title: 'Gå uppåt'});

          for (i = 0; i < json.length; i++)
            {
            html += '<li data-url="' + json[i].url + '">' + (i ? '<input type="radio" name="select-page" /> ' : '') + '<a href="javascript: void(0);" class="browse-to-link">' + json[i].title + '</a></li>';
            }

          elem('dw_KWE_page_browser').innerHTML = html;
          elem('dw_KWE_cd').innerHTML = resp.page.cd;
          }, function() {}