function(repos, name, table) {
    var $table, $tbody, amount, html, template;
    if (table == null) {
      table = "table";
    }
    $table = $(table);
    $tbody = $table.children("tbody:first");
    template = "{{#array}}\n    <tr>\n          <td><a href=\"{{html_url}}\" title=\"{{full_name}}\">{{name}}</a></td>\n          <td>{{description}}</td>\n          <td><img src=\"{{owner.avatar_url}}\"> <a href=\"#users/{{owner.login}}\">{{owner.login}}</a></td>\n          <td>{{watchers}}</td>\n          <td>{{language}}</td>\n      </tr>\n{{/array}}";
    html = Mustache.to_html(template, {
      array: repos
    });
    if (repos) {
      amount = repos.length;
    } else {
      amount = 0;
    }
    $("header p").html(Mustache.to_html('<a href="https://github.com/{{name}}">{{name}}</a> ({{amount}})', {
      name: name,
      amount: amount
    }));
    $tbody.hide();
    $tbody.html(html);
    $tbody.fadeIn(1200);
    $table.stupidtable();
    return $("#spinner").spin(false);
  }