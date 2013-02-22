

var express =require("express"),
	app=express(),
	server=require('http').createServer(app),
	cons= require('consolidate'),
	path = require("path");
	app.engine('.html',cons.jade);
	app.set('view engine','html');
	app.use(express.static('./public'));
	
	//Funciones importantes para subir archivos
	app.use(express.bodyParser());
	app.use(express.bodyParser({uploadDir:'./uploads'}));
	
	app.get('/',function  (req, res) {
		res.render("index");
	});
	var fs=require('fs');//requerir modulo del sistema para escribir Archivos 
	app.post('/subir',function (req,res) {

		var tmp_path=req.files.miarchivo.path;//ruta del archivo
		var tipo=req.files.miarchivo.type;//tipo del archivo
		
		if(tipo=='image/png' || tipo=='image/jpg' || tipo=='image/jpeg' ){
			//Si es de tipo png jpg o jpeg
			var aleatorio=Math.floor((Math.random()*9999)+1);//Variable aleatoria
			var nombrearchivo=aleatorio+""+req.files.miarchivo.name;//nombre del archivo mas variable aleatoria

			var target_path='./public/uploads/'+nombrearchivo;// hacia donde subiremos nuestro archivo dentro de nuestro servidor
			fs.rename(tmp_path,target_path,function (err) {//Escribimos el archivo
				fs.unlink(tmp_path,function (err) {//borramos el archivo tmp
					//damos una respuesta al cliente
					res.send('<p>El archivo se subio correctamente</p></br><img  src="./uploads/'+nombrearchivo+'"/>');
				});
			});

		}else{
			res.send('Tipo de archivo no soportado');
		}

	});
	
	server.listen(3000);