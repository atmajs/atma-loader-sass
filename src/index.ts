import * as Base from 'atma-io-middleware-base'
import { processAsync } from './compiler'


export = Base.create({
	name: 'atma-loader-sass',
    textOnly: true,
    cacheable: true,
    defaultOptions: {
        mimeType: 'text/css',
        extensions: [ 'sass', 'scss' ],
        base: '/',
        sass: {

        }
    },
    processAsync
});
