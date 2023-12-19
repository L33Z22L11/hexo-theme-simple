const { version } = require('../../../package.json');
const theme_version = version;
const path = require('path');
const site_root = hexo.config.root;

const cdn_info = hexo.render.renderSync({ path: path.join(hexo.theme_dir, '/_cdn.yml'), engine: 'yaml' });

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function merge(target, source) {
    for (const key in source) {
        if (isObject(target[key]) && isObject(source[key])) {
            merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

function simple_cdn_system_prefix(source, hexo) {
    const prefix_list = ['local', 'npm', 'cdnjs'];
    for (const key in source) {
        if (isObject(source[key])) {
            simple_cdn_system_prefix(source[key], hexo);
        } else if (source[key] && typeof source[key] == 'string') {
            for (const prefix of prefix_list) {
                if (source[key].match(new RegExp(`^simple-${prefix}\/`, 'g'))) {
                    const my_prefix = hexo.theme.config.cdn_system.system_config[prefix].prefix.replace(/\$\{site_root\}/g, site_root);
                    source[key] = my_prefix + source[key].replace(new RegExp(`^simple-${prefix}`, 'g'), '');
                    break;
                }
            }
        } else if (source[key] && Array.isArray(source[key]) && source[key].length > 0) {
            source[key].forEach((item, index) => {
                if (item && typeof item == 'string') {
                    for (const prefix of prefix_list) {
                        if (item.match(new RegExp(`^simple-${prefix}\/`, 'g'))) {
                            const my_prefix = hexo.theme.config.cdn_system.system_config[prefix].prefix.replace(/\$\{site_root\}/g, site_root);
                            source[key][index] = my_prefix + item.replace(new RegExp(`^simple-${prefix}`, 'g'), '');
                            break;
                        }
                    }
                } else if (isObject(item)) {
                    simple_cdn_system_prefix(item, hexo);
                }
            });
        }
    }
}

const minFile = (file) => {
    return file.replace(/(?<!\.min)\.(js|css)$/g, (ext) => '.min' + ext);
};

function match_cdn_source(key) {
    if (key && cdn_info[key]) {
        // _cdn.yml item
        const info = cdn_info[key];
        const system_config = hexo.theme.config.cdn_system.system_config;
        for (const iterator of hexo.theme.config.cdn_system.priority) {
            // priority item
            if (iterator === 'custom') {
                if (system_config.custom) {
                    const r = system_config.custom[key];
                    if (r) {
                        return r;
                    }
                }
            } else {
                if (info[iterator] === true) {
                    const prefix = system_config[iterator].prefix?.replace(/\$\{site_root\}/g, site_root);
                    const format = system_config[iterator].format;
                    let name = info.name;
                    let file = info.file;
                    if (iterator === 'cdnjs') {
                        if (info.cdnjs_name) {
                            name = info.cdnjs_name;
                        }
                        if (info.cdnjs_file) {
                            file = info.cdnjs_file;
                        } else {
                            file = file.replace(/^[lib|dist]*\/|browser\//g, '');
                        }
                    }
                    if (info.local === true) {
                        file = file.replace(/^source\//g, '');
                    }
                    let min_file = minFile(file);
                    if (iterator === 'cdnjs') {
                        if (info.cdnjs_no_min_file) {
                            min_file = file;
                        }
                    }
                    let version = info.version;
                    if (info.local === true) {
                        version = theme_version;
                    }
                    const timestamp = hexo.theme.config.getStartTime;
                    const value = {
                        version,
                        name,
                        file,
                        min_file,
                        prefix,
                        timestamp,
                    };
                    let res = format;
                    let p = 0;
                    while (/\$\{(.+?)\}/g.test(res)) {
                        res = res?.replace(/\$\{(.+?)\}/g, (match, $1) => (value[$1] ? value[$1] : eval($1))) || null;
                        // 防止死循环。。。
                        p++;
                        if (p > 20) {
                            break;
                        }
                    }
                    return res;
                }
            }
        }
    }
    return null;
}

// 收集 CDN 资源
/**
 * `hexo.theme.config.cdn` is an object that contains the CDN source for each library.
 *
 * The `cdn_info` object is defined in the `_cdn.yml` file. It contains the name of the library, the
 * version, and the CDN source etc.
 *
 * The `match_cdn_source` function returns the CDN source for
 * the library.
 *
 * The `collect_cdn_source` function is called in the `_cdn.yml` file. It loops through the
 * `cdn_info` object and adds the CDN source for each library to the `hexo.theme.config.cdn` object.
 *
 * The `hexo.theme.config.debug` variable is defined in the `_config.yml` file. It is set to `true`
 */
function collect_cdn_source() {
    hexo.theme.config.cdn = {};
    Object.keys(cdn_info).forEach((e) => {
        hexo.theme.config.cdn[e] = match_cdn_source(e);
    });
    if (hexo.theme.config.debug == 'cdn') console.log(hexo.theme.config.cdn);
}

hexo.on('generateBefore', () => {
    /* It's replacing the prefix of the source with the prefix you set in the configuration file. */
    simple_cdn_system_prefix(hexo.theme.config, hexo);
    // 可以在 source/_data/cdn.yml 覆盖 theme/_cdn.yml
    const data = hexo.locals.get('data');
    if (data.cdn) {
        merge(cdn_info, data.cdn);
    }
    /* Collecting the CDN source for each library. */
    collect_cdn_source();
});
