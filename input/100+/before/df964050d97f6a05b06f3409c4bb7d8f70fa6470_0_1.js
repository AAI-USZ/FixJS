function(data) {
            for(var i=0;i<this.types.length;i++)
            {
                if(this.types[i].name == data.type.toLowerCase())
                    this.type(this.types[i]);
            }
            tryLoad(data,['marks','prompt','stepsPenalty'],this);

            if(data.steps)
            {
                data.steps.map(function(s) {
                    this.steps.push(new Part(null,this,this.steps,s));
                },this);
            }

            switch(this.type().name)
            {
            case 'gapfill':
                if(data.gaps)
                {
                    data.gaps.map(function(g) {
                        this.gapfill.gaps.push(new Part(null,this,this.gapfill.gaps,g));
                    },this);
                }
                break;
            case 'jme':
                tryLoad(data,['answer','answerSimplification'],this.jme);
                for(var i=0;i<this.jme.checkingTypes.length;i++)
                {
                    if(this.jme.checkingTypes[i].name == data.checkingtype)
                        this.jme.checkingType(this.jme.checkingTypes[i]);
                }
                tryLoad(data,'checkingaccuracy',this.jme.checkingType(),'accuracy');

                tryLoad(data.maxlength,['length','partialCredit','message'],this.jme.maxlength);
                tryLoad(data.minlength,['length','partialCredit','message'],this.jme.minlength);
                tryLoad(data.musthave,['strings','showStrings','partialCredit','message'],this.jme.musthave);
                tryLoad(data.notallowed,['strings','showStrings','partialCredt','message'],this.jme.notallowed);

                break;
            case 'numberentry':
                tryLoad(data,['minValue','maxValue','integerAnswer','partialCredit'],this.numberentry);
				if('answer' in data) {
					this.numberentry.minValue(data.answer);
					this.numberentry.maxValue(data.answer);
				}

                break;
            case 'patternmatch':
                tryLoad(data,['answer','displayAnswer','caseSensitive','partialCredit'],this.patternmatch);
                break;
            case 'm_n_x':
                tryLoad(data,['minMarks','maxMarks','minAnswers','maxAnswers','shuffleChoices','shuffleAnswers'],this.multiplechoice);
                for(var i=0;i<this.multiplechoice.displayTypes.m_n_x.length;i++)
                {
                    if(this.multiplechoice.displayTypes.m_n_x[i].name==data.displayType)
                        this.multiplechoice.displayType(this.multiplechoice.displayTypes.m_n_x[i]);
                }

                for(var i=0;i<data.answers.length;i++)
                {
                    var a = this.addAnswer();
                    a.content(data.answers[i]);
                }
                for(var i=0;i<data.choices.length;i++)
                {
                    var c = this.addChoice(data.choices[i]);
                    c.content(data.choices[i]);
                    for(var j=0;j<data.answers.length;j++)
                    {
                        this.multiplechoice.choices()[i].answers()[j].marks(data.matrix[i][j]);
                    }
                }
                break;
            case '1_n_2':
            case 'm_n_2':
                tryLoad(data,['minMarks','maxMarks','shuffleChoices','displayColumns'],this.multiplechoice);

                var displayTypes = this.multiplechoice.displayTypes[this.type().name];
                for(var i=0;i<displayTypes.length;i++)
                {
                    if(displayTypes[i].name==data.displayType)
                        this.multiplechoice.displayType(displayTypes[i]);
                }

                for(var i=0;i<data.choices.length;i++)
                {
                    var c = this.addChoice(data.choices[i]);
                    c.content(data.choices[i] || '');
                    c.marks(data.matrix[i] || 0);
					if('distractors' in data)
                    {
	                    c.distractor(data.distractors[i] || '');
                    }
                }
                break;

            }
        }