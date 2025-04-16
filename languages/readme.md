
# Beware !

Using 'wp i18n make-json xxx.po --no-purge' results in a different md5-hash than wp expects in wp-includes/I10n.php. Due to extracting languagestrings from /src/ while loading the translations from /build.

See: https://github.com/wp-cli/i18n-command/issues/177

Easiest is probably to exclude files from ./src when doing a make-pot. Like so:

$wp i18n make-pot ./ languages/accordion.pot --exclude=src/

After that:

$wp i18n make-json languages --no-purge

At first I just renamed the json after finishing the translation. Works as well but must be done everytime a new pot is made.