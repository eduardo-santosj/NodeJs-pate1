const app = require('./src/config/custom-express')

app.listen(3002, function() {
   console.log('servidor rodando na porta 3000');
});


// const http = require('http');
// const servidor = http.createServer(function (req, resp) {
//     let html = '';

//     if(req.url == '/') {
//         html = `
//             <html>
//                 <head>
//                     <meta charset="utf-8">
//                 </head>
//                 <body>
//                     <h1> Casa do Código </h1>
//                 </body> 
//             </html>
//             `;
//     } else if ( req.url == '/livros') {
//         html = `
//             <html>
//                 <head>
//                     <meta charset="utf-8">
//                 </head>
//                 <body>
//                     <h1> Listagem de livros </h1>
//                 </body> 
//             </html>
//         `;
//     }
//     resp.end(html)
// });
// servidor.listen(3002);