#!/usr/bin/env node

var prerender = require('prerender');

var server = prerender({
    workers: process.env.PRERENDER_NUM_WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS
});

server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());

// process.env.BLACKLISTED_DOMAINS = []; // 黑名单域名
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

if (process.env.NODE_ENV === 'production') {
    process.env.MONGOLAB_URI = 'mongodb://localhost:27017/prerender';
} else {
    process.env.MONGOLAB_URI = 'mongodb://localhost:27017/prerender';
}

process.env.PAGE_TTL = 86400; // 缓存时间1天，单位秒
server.use(require('prerender-mongo'));

server.use(require('./lib/removeLazyload')); // 移除图片懒加载

server.start();
