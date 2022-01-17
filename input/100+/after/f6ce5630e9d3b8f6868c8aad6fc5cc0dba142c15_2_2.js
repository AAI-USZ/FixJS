function friendlytagCallbackChangeTarget(e) {
	var value = e.target.values;
	var root = e.target.form;
	var old_area;

	if(root.section) {
		Twinkle.talkback.prev_section = root.section.value;
	}
	if(root.message) {
		Twinkle.talkback.prev_message = root.message.value;
	}
	if(root.page) {
		Twinkle.talkback.prev_page = root.page.value;
	}

	for( var i = 0; i < root.childNodes.length; ++i ) {
		var node = root.childNodes[i];
		if (node instanceof Element && node.getAttribute( 'name' ) === 'work_area' ) {
			old_area = node;
			break;
		}
	}
	var work_area = new Morebits.quickForm.element( { 
			type: 'field',
			label: 'सन्देश जानकारी',
			name: 'work_area'
		} );

	switch( value ) {
		case 'mytalk':
			/* falls through */
		default:
			work_area.append( { 
					type:'input',
					name:'section',
					label:'सम्बंधित अनुभाग (वैकल्पिक)',
					tooltip:'आपके वार्ता पन्ने के उस अनुभाग का नाम जहाँ आपने सन्देश छोड़ा है। अनुभाग की जगह सिर्फ़ वार्ता पन्ने की कड़ी छोड़ने के लिये खाली छोड़ दें।',
					value: Twinkle.talkback.prev_section
				} );
			break;
		case 'usertalk':
			work_area.append( { 
					type:'input',
					name:'page',
					label:'सदस्य',
					tooltip:'उस सदस्य का नाम जिसके वार्ता पन्ने पर आपने सन्देश छोड़ा है।',
					value: Twinkle.talkback.prev_page
				} );
			
			work_area.append( { 
					type:'input',
					name:'section',
					label:'सम्बंधित अनुभाग (वैकल्पिक)',
					tooltip:'उस अनुभाग का नाम जहाँ आपने सन्देश छोड़ा है। अनुभाग की जगह सिर्फ़ वार्ता पन्ने की कड़ी छोड़ने के लिये खाली छोड़ दें।',
					value: Twinkle.talkback.prev_section
				} );
			break;
		case 'an':
			work_area.append( {
					type:'input',
					name:'section',
					label:'सम्बंधित अनुभाग (वैकल्पिक)',
					tooltip:'उस अनुभाग का नाम जहाँ आपने सन्देश छोड़ा है। अनुभाग की जगह सिर्फ़ सूचनापट की कड़ी छोड़ने के लिये खाली छोड़ दें।',
					value: Twinkle.talkback.prev_section
				} );
			break;
		case 'other':
			work_area.append( { 
					type:'input',
					name:'page',
					label:'पन्ने का पूरा नाम',
					tooltip:'उस पन्ने का पूरा नाम जिस पर आपने सन्देश छोड़ा है। उदहारण: "विकिपीडिया:चौपाल"।',
					value: Twinkle.talkback.prev_page
				} );
			
			work_area.append( { 
					type:'input',
					name:'section',
					label:'सम्बंधित अनुभाग (वैकल्पिक)',
					tooltip:'उस अनुभाग का नाम जहाँ आपने सन्देश छोड़ा है। अनुभाग की जगह सिर्फ़ वार्ता पन्ने की कड़ी छोड़ने के लिये खाली छोड़ दें।',
					value: Twinkle.talkback.prev_section
				} );
			break;
	}

	if (value !== "an") {
		work_area.append( { type:'textarea', label:'अतिरिक्त सन्देश (वैकल्पिक):', name:'message', tooltip:'कोई सन्देश जो आप सन्देश साँचे के बाद छोड़ना चाहेंगे।' } );
	}

	work_area = work_area.render();
	root.replaceChild( work_area, old_area );
	if (root.message) {
		root.message.value = Twinkle.talkback.prev_message;
	}
}