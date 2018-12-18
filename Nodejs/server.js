'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');

const server = new Hapi.server({
	port : 3000,
	host:'localhost',
});
const init = async() =>{
	await server.register(Inert);
	server.route({
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {
			return h.file('./public/index.html');
        }
    });
    server.route({
        method: 'GET',
        path: '/product',
        handler: (request, h) => {
			return h.file('./public/products.html');
        }
    });
    server.route({
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
			return h.file('./public/about.html');
        }
    });
	console.log("server started");
	
	await server.start();
	console.log("Server running at :"+ server.info.uri);
};
init();

/*const init = async() =>{

	await server.register(require('inert'));
	
	server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
		directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
    	}
	});
	await server.start();
	console.log('Server running at :${server.info.uri}');
}*/

process.on('unhandledRejection',(err)=>{
	console.log(err);
	process.exit(1);
});

//init();