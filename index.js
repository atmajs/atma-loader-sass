
// source ./RootModule.js
(function(){
	
	var _src_compiler = {};

// source ./ModuleSimplified.js
var _src_compiler;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var sass = null;
function processAsync(source, file, compiler) {
    var uri = file.uri, paths = [uri.toLocalDir()], out = {
        error: null,
        content: null,
        sourceMap: null
    };
    var base = compiler.getOption('base') || '/';
    if (base[0] === '/') {
        base = atma_utils_1.class_Uri.combine(process.cwd(), base);
    }
    paths.push(new atma_utils_1.class_Uri(base).toLocalDir());
    var options = {
        sourceMap: {
            sourceMapURL: uri.file + '.map',
            sourceMapRootpath: 'file:///',
            outputSourceFiles: true,
        },
        data: source,
        file: uri.toLocalFile(),
        includePaths: paths
    };
    var sassOpts = compiler.getOption('sass') || {};
    if (sassOpts.includePaths) {
        sassOpts.includePaths = sassOpts.includePaths.map(function (path) {
            if (path.startsWith('file')) {
                return new atma_utils_1.class_Uri(path).toLocalDir();
            }
            return atma_utils_1.class_Uri.combine(base, path);
        });
    }
    extend(options, sassOpts);
    return new Promise(function (resolve, reject) {
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
    });
}
exports.processAsync = processAsync;
function extend(options, sass) {
    var _a;
    for (var key in sass) {
        var val = sass[key];
        if (val == null) {
            continue;
        }
        var opt = options[key];
        if (opt == null || typeof val !== 'object') {
            options[key] = sass[key];
            continue;
        }
        if (Array.isArray(options[key])) {
            (_a = options[key]).push.apply(_a, sass[key]);
            continue;
        }
        extend(opt, val);
    }
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_compiler) && isObject(module.exports)) {
		Object.assign(_src_compiler, module.exports);
		return;
	}
	_src_compiler = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var Base = require("atma-io-middleware-base");
var compiler_1 = _src_compiler;
module.exports = Base.create({
    name: 'atma-loader-sass',
    textOnly: true,
    cacheable: true,
    defaultOptions: {
        mimeType: 'text/css',
        extensions: ['sass', 'scss'],
        base: '/',
        sass: {}
    },
    processAsync: compiler_1.processAsync
});


}());
// end:source ./RootModule.js
