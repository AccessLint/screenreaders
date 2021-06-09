require 'rubygems'
require 'open3'

`open 'https://twitter.com' -a Safari`

25.times do
  sleep 0.3
  Open3.popen3('test/commands/move-right') do |stdin, stdout, stderr, wait_thr|
    puts stdout.read
  end
end