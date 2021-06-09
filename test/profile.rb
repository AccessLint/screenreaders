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

10.times do
  Open3.popen3('test/commands/move-right') do |stdin, stdout, stderr, wait_thr|
    puts stdout.read
  end
end

@driver.quit