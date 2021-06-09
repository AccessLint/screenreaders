require 'rubygems'
require 'appium_lib_core'
require 'open3'

opts = {
  desired_capabilities: {
    deviceName: 'iPhone Simulator',
    platformName: 'iOS',
    automationName: 'XCUITest',
  },
  appium_lib: {
    wait: 30
  }
}

@core = Appium::Core.for(opts) # create a core driver with `opts`
@driver = @core.start_driver

el = @driver.find_element(:id, 'Profile') # find an element
el.click

Open3.popen3('test/profile') do |stdin, stdout, stderr, wait_thr|
    puts stderr.read, stdout.read
    @driver.quit
end