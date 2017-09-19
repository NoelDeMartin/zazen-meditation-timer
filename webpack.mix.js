let mix = require('laravel-mix');

mix.options({
        extractVueStyles: true
    })
    .ts('src/app.ts', 'js')
    .sass('src/app.scss', 'css');
