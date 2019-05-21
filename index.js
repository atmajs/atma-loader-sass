
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
var sass = require("sass");
var atma_utils_1 = require("atma-utils");
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
exports.processAsync = processAsync;
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
