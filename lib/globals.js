var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: './tests_output',
    relativeScreenshots: true
});
module.exports = {
    reporter: reporter.fn
};