const BINPATH = './node_modules/nightwatch/bin/';
var SCREENSHOT_PATH = './tests_output/screenshots'
var SELENIUM_CONFIGURATION = {
  start_process: true,
  server_path: BINPATH +'selenium.jar',
  host: '127.0.0.1',
  port: 4444,
  cli_args: { // chromedriver is downloaded by selenium-download (see readme)
      "webdriver.chrome.driver" : BINPATH + "chromedriver"
    }
};

var CHROME_CONFIGURATION = {
  browserName: 'chrome',
  javascriptEnabled: true,
  acceptSslCerts: true
};


var DEFAULT_CONFIGURATION = {
  launch_url: 'http://www.cleverbot.com',
  selenium_port: 4444,
  selenium_host: 'localhost',
  desiredCapabilities: CHROME_CONFIGURATION,
  screenshots: {
        enabled: true, 
        on_failure: true,
        on_error: true,
        path: SCREENSHOT_PATH
      }
};

var ENVIRONMENTS = {
  default: DEFAULT_CONFIGURATION
};

module.exports = {
  src_folders: ['tests/e2e'],
  page_objects_path: 'tests/pages',
  selenium: SELENIUM_CONFIGURATION,
  globals_path: "./lib/globals.js",
  live_output: true,
  log_screenshot_data: true,
  test_settings: ENVIRONMENTS
};

require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});
