import { Compiler } from 'atma-io-middleware-base'
import * as sass from 'sass'
import { class_Uri } from 'atma-utils'



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

    sass.render(options, function (error, result) {
        if (error) {
            out.content = out.error = error;
            return;
        }
        out.content = result.css;
        out.sourceMap = result.map;
    });

    return out;
}
