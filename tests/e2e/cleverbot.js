// store variables from before hook
var mail, username, verifyLink, email;
var conf = require('../../nightwatch.conf.js');
module.exports = {
	'before': function(client) {
		email = client.page.email();
		email
		.navigate()
		.waitForElementVisible('@mail',1000)
		.getValue('@mail',function (result) {
			mail = result.value;
			username = mail.substring(0, mail.indexOf("@"));
		});
	},
	'CleverBot signup': function (client){

		var bot = client.page.bot();
		bot.navigate();
		bot.expect.section('@menu').to.be.visible.before(10000);
		var menuSection = bot.section.menu;
		menuSection.open();
		var signup = menuSection.section.signup;
		//workaround to get email from queue 
		client.perform(function () {
			signup.fillInForm(mail, username);
		});

		signup.submit();
	},
	'CleverBot signin': function (client){
		email
		.navigate()
		.recieve();

		client.perform(function () {
			email.read(username);
		});
		email.getText('@verifyLink', function (result) {
			verifyLink = result.value;
		});
		var bot = client.page.bot();
		client.perform( function () {
			bot.navigate('http://' + verifyLink);			
		});
		var menuSection = bot.section.menu;
		menuSection.expect.section('@signin').to.be.present.before(10000);
		var signin = menuSection.section.signin;
		signin.expect.element('@message').text.to.contain('account verified, please sign in');
		client.perform(function () {
			signin.fillInForm(username);
		});
		signin.submit();

		client.perform(function () {
			menuSection.expect.element('@loggedin').text.to.contain(username).before(1000);
		});
		},
	'CleverBot chat': function (client){
		var bot = client.page.bot();
		var chat = bot.section.chat;
		chat.talk();
	},
	'after': function(client) {
		client.end();
	}
};