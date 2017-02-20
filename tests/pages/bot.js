'use strict';

var messages = ["Hello","Fine. And how are you?","Testing", "Sorry. Have to go. Bye!", "Test is passed"];

module.exports = {
	url: function (url) {
		return url ? url : this.api.launch_url + '';
	},
	elements: {
		menu: '#cbsocialsigninup',
		chat: '#content'
	},
	sections: {
		menu: {
			selector: '#cbsocialsigninup',
			elements: {
				signup: '#cbsocialsignupform',
				signin: 'form[onsubmit*="signin"]',
				loggedin: 'span'
			},
			commands: [{
				open: function(){
					return this.click(this.selector).expect.section('@signup').to.be.visible.before(1000);;
				}
			}],
			sections: {
				signup: {
					selector: '#cbsocialsignupform',
					elements: {
						username: {
							selector: 'input[name=username]'
						},
						fullname: {
							selector: 'input[name=fullname]'
						},
						email: {
							selector: 'input[name=email]'
						},
						passwordclear: {
							selector: 'input.passwordclear'
						},
						password: {
							selector: 'input.passwordnormal'
						},
						agreement: {
							selector: '#cbsocialregisterterms option[value=yes]'
						},
						message: {
							selector: '#cbsocialmessagesignup'
						},
						submit: {
							selector: 'input.standout'
						}
					},
					commands: [{
						fillInForm: function (email, username) {
							return this.setValue('@username',username)
							.setValue('@fullname', username)
							.setValue('@email', email)
							.click('@passwordclear')
							.setValue('@password','testpassword')
							.click('@agreement');
						}
					},
					{
						submit: function() {
							this.click('@submit');
							this.expect.element('@message').text.to.contain('We have sent you an email.').before(1000);
							return this.api.pause(300);
						}
					}]
				},
				signin: {
					selector: 'form[onsubmit*="signin"]',
					elements: {
						message: {
							selector: '#cbsocialmessagesignin'
						},
						username: {
							selector: 'input[name=username]'
						},
						passwordclear: {
							selector: 'input.passwordclear'
						},
						password: {
							selector: 'input.passwordnormal'
						},
						submit: {
							selector: 'input[type=submit]'
						}
					},
					commands: [{
						fillInForm: function (username) {
							//parse username from email
							
							return this.setValue('@username',username)
							.click('@passwordclear')
							.setValue('@password','testpassword');
						}
					},
					{
						submit: function() {
							this.click('@submit')
							return this.api.pause(300);
						}
					}]
				},
				loggedin: {
					selector: 'span'
				}
			}
		},
		chat: {
			selector: '#content',
			elements: {
				conversation: {
					selector: '#conversationcontainer'
				},
				input: {
					selector: 'input.stimulus'
				},
				thinking: {
					selector: 'form.inprogress'
				},
				talking: {
					selector: '#snipTextIcon'
				}
			},
			commands: [{
				talk: function () {
					for (var i = 0, len = messages.length; i < len; i++) {
						this.waitForElementVisible('@conversation',1000)
						.setValue('@input',[messages[i],this.api.Keys.ENTER])
						.waitForElementNotPresent('@thinking', 6000, false,'')
						.waitForElementVisible('@talking',4000);
						this.verify.containsText('@conversation',messages[i]);
					};
					return this.api.pause(2000);
				}
			}]
		}
	}
};