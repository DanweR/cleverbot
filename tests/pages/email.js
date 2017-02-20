var url = 'http://temp-mail.org/en'

module.exports = {

	url: url,
	elements:{
		mail: '#mail',
		emails: '#mails',
		subject: 'a.title-subject',
		message: 'div.pm-text',
		verifyLink: 'a[href*=cleverbot]',
		delete: '#click-to-delete'
	},
	commands: [{
		recieve: function() {
			this.waitForElementVisible('@emails',1000)
			.waitForElementPresent('@subject',60000) // can take a while
			.verify.containsText('@subject','Welcome to Cleverbot')
			.click('@subject');

			return this.api.pause(200);
		},
		read: function (username) {
			return this.waitForElementVisible('@message',1000)
			.verify.containsText('@message', 'Welcome ' + username + '!');
		},
		delete: function () {
			return this.click('@delete');
		}

	}]

};

