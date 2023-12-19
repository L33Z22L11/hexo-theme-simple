import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            cdn: 'https://esm.sh/',
            extraProperties: {
                display: 'inline-block',
                height: '1.2em',
                width: '1.2em',
                color: 'inherit',
                'vertical-align': 'text-bottom',
            },
        }),
    ],
    content: {
        pipeline: {
            include: [/\.(ejs|html|md|yml)($|\?)/],
        },
    },
    cli: {
        entry: {
            patterns: ['layout/**/*.ejs', '../../source/**/*', '*.yml'],
            outFile: 'source/css/uno.css',
        },
    },
    theme: {
        breakpoints: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1070px',
            xl: '1280px',
        },
    },
    shortcuts: {
        'wh-full': 'wfull hfull',
        'nav-wh': 'wfull h16',
        'absolute-lt': 'absolute left-0 top-0',
        'absolute-lb': 'absolute left-0 bottom-0',
        'flex-center': 'flex items-center justify-center',
        'flex-x-center': 'flex justify-center',
        'flex-x-between': 'flex justify-between',
        'flex-y-center': 'flex items-center',
        'flex-col': 'flex flex-col',
        'text-overflow': 'text-ellipsis overflow-hidden whitespace-nowrap',
        'nav-base': 'nav-wh translate-0 transform duration-300 bg-white dark:bg-black',
        'box-base': 'bg-white rounded-8px',
        'categories-base': 'py5px px8px rounded-8px hover:text-white first:text-white transition-all duration-300 mr2 last:m0',
    },
});
