f="test.$$.gif"
mime="image/gif"
#LD_LIBRARY_PATH=".:./plugins:." QuickFuzz Zip $f "./xpcshell test_open_xpi.js $(pwd)/$f.fuzzed" -a fuzz --max-size 500 #> /dev/null 2> /dev/null &
#LD_LIBRARY_PATH="..:../plugins:." QuickFuzz Svg $f "timeout 10 ../xpcshell test_decode_dom.js $(pwd)/$f.fuzzed $mime" -a radamsa -s 5 > /dev/null 2> /dev/null &
ASAN_OPTIONS='abort_on_error=1' LD_LIBRARY_PATH="..:../plugins:." QuickFuzz Gif $f "timeout 10 ../xpcshell test_decode_scale_img.js $f.fuzzed $mime" -a radamsa -s 300 > /dev/null 2> /dev/null &
