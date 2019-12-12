const db = require('../../config/database')
const LivroDao = require('../infra/livro-dao')

module.exports = (app) => {
	app.get('/', function(req, res) {
		res.send(
			`
			<html>
			<head>
			<meta charset="utf-8">
			</head>
			<body>
			<h1> Casa do Código </h1>
			</body> 
			</html>
			`
		);
	});
	
	// EXIBE LISTA DE LIVROS
	app.get('/livros', function(req, resp) {
		const livroDao = new LivroDao(db);

		livroDao.lista()
			.then(livros => resp.marko(
				require('../views/livros/lista/lista.marko'),
				{
					livros
				}
			))
			.catch(erro => console.log(erro));
	});

	// EXIBE FORMULARIO DE CADASTRO DE LIVROS
	app.get('/livros/form', function(req, res) {
		res.marko(
			require('../views/livros/form/form.marko'),
			{livro: {}}
		);
	});


	// EXIBE FORMULARIO DE EDIÇÃO DOS LIVROS
	app.get('/livros/form/:id', function(req, res) {
		const id = req.params.id;

		const livroDao = new LivroDao(db);

		livroDao.buscaPorId(id)
			.then(livro => 
				res.marko(
					require('../views/livros/form/form.marko'),
					{livro}
				)
			)
			.catch(erro => console.log(erro));
	});



	app.get('/home', function(req, res) {
		res.marko(
			require('../views/home.marko')
		);
	});


	// posts
	// ADICIONA NOVOS LIVROS
	app.post('/livros', function(req, res) {
		const livroDao = new LivroDao(db);

		livroDao.adiciona(req.body)
			.then(res.redirect('/livros'))
			.catch(erro => console.log(erro));
	});

	// ATUALIZA LIVROS
	// ADICIONA NOVOS LIVROS
	app.put('/livros', function(req, res) {
		const livroDao = new LivroDao(db);

		livroDao.atualiza(req.body)
			.then(res.redirect('/livros'))
			.catch(erro => console.log(erro));
	});

	// EDITA LIVRO SELECIONADO
	app.post('/livros/form/:id', function(req, res) {
		const id = req.params.id;

		const livroDao = new LivroDao(db);

		livroDao.buscaPorId(id)
			.then(livro => 
				res.marko(
					require('../views/livros/form/form.marko'),
					{livro}
				)
			)
			.catch(erro => console.log(erro));
	});

	// EXCLUI LIVRO SELECIONADO
	app.delete('/livros/:id', function(req, resp) {
		const id = req.params.id;
 
		const livroDao = new LivroDao(db);
		livroDao.remove(id)
				.then(() => resp.status(200).end())
				.catch(erro => console.log(erro));
	});

	// delete
}