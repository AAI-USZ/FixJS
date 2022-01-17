function(translatable_node, is_language_case) {
    var self = this;
    Tr8n.UI.LanguageSelector.hide();
    Tr8n.UI.Lightbox.hide();
    Tr8n.Utils.hideFlash();

    this.content_frame.style.width = '100%';
    this.content_frame.style.height = '10px';
    this.content_frame.src = Tr8n.Utils.toUrl('/tr8n/language/translator_splash_screen');

    var stem = {v: "top", h: "left", width: 10, height: 12};
    var label_rect = Tr8n.Utils.elementRect(translatable_node);
    var new_container_origin = {left: label_rect.left, top: (label_rect.top + label_rect.height + stem.height)}
    var stem_offset = label_rect.width/2;
    var label_center = label_rect.left + label_rect.width/2;

    // check if the lightbox will be on the left or on the right
    if (label_rect.left + label_rect.width + window.innerWidth/2 > window.innerWidth) {
      new_container_origin.left = label_rect.left + label_rect.width - this.container_width;
      stem.h = "right";
      if (new_container_origin.left + 20 > label_center) {
        new_container_origin.left = label_center - 150;
        stem_offset = new_container_origin.left - 200;
      }
    } 

    this.stem_image.className = 'stem ' + stem.v + "_" + stem.h;
    
    if (stem.h == 'left') {
      this.stem_image.style.left = stem_offset + 'px';
      this.stem_image.style.right = '';
    } else {
      this.stem_image.style.right = stem_offset + 'px';
      this.stem_image.style.left = '';
    }

    window.scrollTo(label_rect.left, label_rect.top - 100);

    this.container.style.left     = new_container_origin.left + "px";
    this.container.style.top      = new_container_origin.top + "px";
    this.container.style.display  = "block";

    window.setTimeout(function() {
      var url = '';
      var params = {};
      if (is_language_case) {
        self.language_case_id = translatable_node.getAttribute('case_id');
        self.language_case_rule_id = translatable_node.getAttribute('rule_id');
        self.language_case_key = translatable_node.getAttribute('case_key');
        url = '/tr8n/language_cases/manager';
        params['case_id'] = self.language_case_id;
        params['rule_id'] = self.language_case_rule_id;
        params['case_key'] = self.language_case_key;
      } else {
        self.translation_key_id = translatable_node.getAttribute('translation_key_id');
        url = '/tr8n/language/translator';
        params['translation_key_id'] = self.translation_key_id;
      }
      self.content_frame.src = Tr8n.Utils.toUrl(url, params);
    }, 500);
  }