function(channel) {

		this.closing            = false;

		this.channel            = channel;

		this.topic              = '';

		this.key                = false;

		this.bans               = [];

		this.messageCounter     = 0;

		this.divMain            = 'channel_'+this.channel;

		this.divNames           = 'names_'+this.channel;

		this.divWhoHeader       = 'who_header_' + this.channel;

		this.divWhoSizer        = 'who_sizer_'+this.channel;

		this.divWhoContent      = 'who_content_' + this.channel;

		this.ulWhoContent       = 'who_content_ul_' + this.channel;

		this.divWhoTitle        = 'who_title_' + this.channel;

		this.divMessages        = 'messages_' + this.channel;

		this.divMessagesHeader  = 'messages_header_' + this.channel;

		this.divHeaderClose     = 'messages_close_' + this.channel;

		this.divMessagesContent = 'messages_content_' + this.channel;

		this.divButton          = 'channel_button_'+this.channel;

		this.divSizer           = 'sizer_'+this.channel;

		this.divTopic           = 'messages_topic_' + this.channel;

		this.createLayout();

		this.members            = new chatMembers(this.channel, this.ulWhoContent, this.divWhoTitle, this);

		$("#" + this.divMessagesHeader).html(this.channel+'<span id="'+this.divTopic+'"></span>');

		var close = this.channel != 'info' ? '<div class="tab_close" id="'+this.divHeaderClose+'"></div>' : '';

		$("#toolbar").append('<div class="channel_button" id="'+this.divButton+'"><div class="tab_left"></div><div class="tab_center">'+close+this.channel+'</div><div class="tab_right"></div></div>');

		//$(this.divWhoSizer).onclick = this.collapseWho.bindAsEventListener(this);

		//$(this.divButton).onclick   = this.show.bindAsEventListener(this);

		//this.eventMouseDown = this.initDrag.bindAsEventListener(this);

		//this.eventMouseMove = this.updateDrag.bindAsEventListener(this);

		//this.eventMouseUp   = this.endDrag.bindAsEventListener(this);

		$('#' + this.divSizer).mousedown(function(){this.eventMouseDown()});



		this.hide();

		if (this.channel != 'info') {

			$(this.divButton).hide();

			new Effect.Appear($(this.divButton), { duration : 0.4 });

			$(this.divHeaderClose).onclick = this.close.bindAsEventListener(this);

		} else {

			$("#" + this.divNames).css('width', '0px');

			$("#" + this.divSizer).hide();

			$("#" + this.divNames).hide();

		}

		setTimeout('chat.createSortable();', 10);

	}