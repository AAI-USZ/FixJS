function() {
      
        __out.push('<section class="area">\n  ');
      
        if (this.prev || this.next) {
          __out.push('\n    <nav class=\'pagination\'>\n      ');
          if (this.prev) {
            __out.push('\n        <a class=\'prev btn\' href="/#/');
            __out.push(__sanitize(this.channel.slug));
            __out.push('/show:');
            __out.push(__sanitize(this.prev.id));
            __out.push('">Previous</a>\n      ');
          }
          __out.push('\n\n      <a class=\'btn\' href="/#/');
          __out.push(__sanitize(this.channel.slug));
          __out.push('/overview">Up</a>\n\n      ');
          if (this.next) {
            __out.push('\n        <a class=\'next btn\' href="/#/');
            __out.push(__sanitize(this.channel.slug));
            __out.push('/show:');
            __out.push(__sanitize(this.next.id));
            __out.push('">Next</a>\n      ');
          }
          __out.push('\n    </nav>\n  ');
        }
      
        __out.push('\n\n  <header class="information">\n    <section class="title">\n      ');
      
        if (this.block.title) {
          __out.push('\n        <a class=\'btn\' href="/#/');
          __out.push(__sanitize(this.channel.slug));
          __out.push('/show:');
          __out.push(__sanitize(this.block.id));
          __out.push('">');
          __out.push(__sanitize(_.str.prune(this.block.title, 50)));
          __out.push('</a>\n      ');
        } else {
          __out.push('\n        <a class=\'btn\' href="/#/');
          __out.push(__sanitize(this.channel.slug));
          __out.push('/show:');
          __out.push(__sanitize(this.block.id));
          __out.push('">¶</a>\n      ');
        }
      
        __out.push('\n    </section>\n\n    <section class="metadata">\n      ');
      
        if (this.block.description) {
          __out.push('\n        <div class="description">\n          ');
          __out.push(this.block.description);
          __out.push('\n        </div>\n      ');
        }
      
        __out.push('\n    </section>\n  </header>\n</section>\n\n<div id="block_');
      
        __out.push(__sanitize(this.block.id));
      
        __out.push('" class="full ');
      
        __out.push(__sanitize(this.block.block_type.toLowerCase()));
      
        __out.push('" data-type="');
      
        __out.push(__sanitize(this.block.block_type));
      
        __out.push('">\n  ');
      
        if (this.block.block_type === 'Media') {
          __out.push('\n    <div class="embed occupy">\n      ');
          __out.push(this.block.embed_html);
          __out.push('\n    </div>\n\n  ');
        } else if (this.block.block_type === 'Link') {
          __out.push('\n    <div class="link occupy">\n      <iframe src="');
          __out.push(__sanitize(this.block.source_url));
          __out.push('" width="100%" height="100%" />\n    </div>\n\n  ');
        } else if (this.block.block_type === 'Image') {
          __out.push('\n    <div class="image loading slide">\n      <div class="wrap">\n        <a href="');
          __out.push(__sanitize(this.block.image_original));
          __out.push('" class="middle" target="_blank">\n          <img src="http://d2ss1gpcas6f9e.cloudfront.net/?resize=900x900%3E&src=');
          __out.push(__sanitize(this.block.image_original));
          __out.push('" alt="');
          __out.push(__sanitize(this.block.title));
          __out.push('" />\n        </a>\n      </div>\n    </div>\n\n  ');
        } else if (this.block.block_type === 'Text') {
          __out.push('\n    <div class="text slide">\n      <div class="wrap">\n        <div class="middle">\n          <div class="content">');
          __out.push(this.block.content);
          __out.push('</div>\n        </div>\n      </div>\n    </div>\n  ');
        }
      
        __out.push('\n</div>');
      
      }