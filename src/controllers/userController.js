const users = require('../mocks/users');

module.exports = {
    listUsers(request, response) {
        const {order} = request.query;

        const sortedUsers = users.sort((a, b) => {
            if (order === 'desc') {
                return a.id < b.id ? 1 : -1;
            }

            return a.id > b.id ? 1 : -1;
        })
        
        response.send(200, sortedUsers);
    },

    getUserById(request, response) {
        const {id} = request.params;
        
        const user = users.find((user) => user.id === Number(id));

        if (!user) {
            return response.send(400, {error: 'usuario nao encontrado'});
        }

        response.send(200, user);
    },

    createUser(request, response) {
        const {body} = request;
        
        if (users.find(user => user.cpf === body.cpf)) {
            return response.send(400, {error: 'cpf duplicado!'});
        }

        if (String(body.cpf).length != 11) {
            return response.send(400, {error: 'cpf com formato invalido!'});
        }

        const lastUserId = users[users.length - 1].id;
        const newUser = {
            cpf: body.cpf,
            nome: body.nome,
            data_nascimento: body.data_nascimento,
            id: lastUserId + 1,
        };
        users.push(newUser);
        response.send(200, newUser);
    },
};