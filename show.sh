for f in $(ls tests/outdir); do
echo $f
#cp "outdir/$f" test.png
LD_LIBRARY_PATH=".:./plugins:." ./xpcshell tests/test_decode_scale_img.js "tests/outdir/$f" "image/gif" 2>&1 | grep -e Assertion -e SUMMARY -e AddressSanitizer #> /dev/null 2> /dev/null
echo $?
done
