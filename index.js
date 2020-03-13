const express = require('express');
const server = express();
server.use(express.json());

var tarefa = [{
    id: 1,
    descricao: "Comprar pão",
    finalizado: false 
},
{
    id: 2,
    descricao: "Lavar a casa",
    finalizado: true
}];

server.get('/tarefa', function(request, response) {
    return response.json(tarefa);
});

server.get('/tarefa/:id', function(request, response){
    const id = request.params.id;
    const produto = tarefa.filter(p => p.id == id);
    return response.json(produto);
})

server.post('/tarefa', function(request, response) {
    const obj = request.body;
    tarefa.push(obj);
    return response.status(201).send();
})

 server.delete('/tarefa/:id', function(request, response){
     const id = request.params.id;
     tarefa = tarefa.filter(p => p.id != id);
     return response.status(200).send();
 })

 server.put('/tarefa/:id', function(request, response) {
     const id = request.params.id;
     const taref = request.body;

     tarefa.forEach(e => {
         if(e.id == id) {
             e.descricao = taref.descricao;
             e.finalizado = taref.finalizado;
             return;
         };
        return response.send();
     });
 });
 
server.listen(process.env.PORT || 3000);