import { Compiler } from 'atma-io-middleware-base'
import { class_Uri } from 'atma-utils'

let sass = null;


export function processAsync(source: string, file, compiler: Compiler) {

    var uri = file.uri,
        paths = [uri.toLocalDir()],
        out = {
            error: null,
            content: null,
            sourceMap: null
        };
    
    let base = <string>compiler.getOption('base') || '/';
    if (base[0] === '/') {
        base = class_Uri.combine(process.cwd(), base);
    }

    paths.push(new class_Uri(base).toLocalDir());

    const options = {
        sourceMap: {
            sourceMapURL: uri.file + '.map',
            sourceMapRootpath: 'file:///',
            outputSourceFiles: true,
        },

        data: source,
        file: uri.toLocalFile(),
        includePaths: paths
    };
    let sassOpts = compiler.getOption('sass') || <any> {};
    if (sassOpts.includePaths) {
        sassOpts.includePaths = sassOpts.includePaths.map(path => {
            if (path.startsWith('file')) {
                return new class_Uri(path).toLocalDir();
            }
            return class_Uri.combine(base, path);
        });
    }
    extend(options, sassOpts);

    return new Promise((resolve, reject) => {
        if (sass == null) {
            sass = require('sass');
        }
        sass.render(options, function (error, result) {
            if (error) {
                //-out.content = out.error = error;
                reject(error);
                return;
            }
            out.content = result.css;
            out.sourceMap = result.map;
            resolve(out);
        });
    })
    
}

function extend (options, sass) {
    for (let key in sass) {
        let val = sass[key];
        if (val == null) {
            continue;
        }
        let opt = options[key];
        if (opt == null || typeof val !== 'object') {
            options[key] = sass[key];
            continue;
        }
        if (Array.isArray(options[key])) {
            options[key].push(...sass[key]);
            continue;
        }
        extend(opt, val);
    }
}