function(resp)
      {
      json = resp.page.files;
      json.splice(0, 0, {folder: 1, url: resp.page.up_path || '', name: 'Gå uppåt'});

      if (resp.page.cd != '')
        resp.page.cd += '/';

      for (i = 0; i < json.length; i++)
        {
        html += '<li data-url="' + (i ? resp.page.cd : '') + json[i].url + '">';
        if (json[i].folder)
          html += ' <a href="javascript: void(0);" class="browse-to-img">' + json[i].name + '</a></li>';
        else
          html += (i ? '<input type="radio" name="select-image" /> ' : '') + '' + json[i].name + '</li>';
        }

      elem('dw_KWE_image_browser').innerHTML = html;
      elem('dw_KWE_cd').innerHTML = '/' + resp.page.cd;
      }, function() {}