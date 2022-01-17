function() {
      Chosen.__super__.set_default_values.call(this);
      this.single_temp = new Template('<a href="javascript:void(0)" class="chzn-single chzn-default"><span>#{default}</span><div><b></b></div></a><div class="chzn-drop" style="left:-9000px;"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>');
      this.multi_temp = new Template('<ul class="chzn-choices"><li class="search-field"><input type="text" value="#{default}" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop" style="left:-9000px;"><ul class="chzn-results"></ul></div>');
      this.choice_temp = new Template('<li class="search-choice" id="#{id}"><span>#{choice}</span><a href="javascript:void(0)" class="search-choice-close" rel="#{position}"></a></li>');
      this.no_results_temp = new Template('<li class="no-results">#{text} "<span>#{terms}</span>"</li>');
      this.new_option_temp = new Template('<option value="#{value}">#{text}</option>');
      return this.create_option_temp = new Template('<li class="create-option active-result"><a href="javascript:void(0);">#{text}</a>: #{terms}</li>');
    }