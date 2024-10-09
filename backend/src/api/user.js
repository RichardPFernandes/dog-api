const UserController = require('../controller/user');
const user = require('../model/user');

class UserApi {
    async createUser(req, res) {
        const { nome, email, senha, role } = req.body;

        var userLogged = null;
        if (req?.session) {
            userLogged = await UserController.findUser(req?.session?.id || 0)
        }

        if ((!userLogged || userLogged.permissao !== 'admin') && role === 'admin') {
            return res.status(403).send({ error: 'Sem permissão' })
        }

        try {
            const user = await UserController.createUser(nome, email, senha, role)
            return res.status(201).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar usuário ${e.message}`})
        }
    }

    async updateUser(req, res) {
        const { id } = req.params
        const { nome, email, senha } = req.body

        const userLogged = await UserController.findUser(req?.session?.id || 0)

        try {
            const user = await UserController.update(Number(id), nome, email, senha, userLogged)
            return res.status(200).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar usuário ${e.message}`})
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params

        const userLogged = await UserController.findUser(req?.session?.id || 0)

        try {
            await UserController.delete(Number(id), userLogged)
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar usuário ${e.message}`})
        }
    }

    async findUsers(req, res) {
        try {
            const user = await UserController.findUser(req?.session?.id || 0)
            if (!req?.session || await user.role !== 'admin') {
                return res.status(403).send({ error: 'Sem permissão' })
            }
            const users = await UserController.find()
            return res.status(200).send(users)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar usuário ${e.message}`})
        }
    }

    async findContext(req, res) {
        try {
            const user = await UserController.findUser(req?.session?.id || 0)
            return res.status(200).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar usuário ${e.message}`})
        }
    }

    async login(req, res) {
        const { email, senha } = req.body
        console.log(req.body)
        try {
            const token = await UserController.login(email, senha)

            res.status(200).send({ token })
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }

    async bloquearUser(req, res) {
        const { id } = req.params

        const userLogged = await UserController.findUser(req?.session?.id || 0)

        try {
            await UserController.bloquear(Number(id), userLogged)
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao bloquear usuário ${e.message}`})
        }
    }

    async desbloquearUser(req, res) {
        const { id } = req.params

        const userLogged = await UserController.findUser(req?.session?.id || 0)

        try {
            await UserController.desbloquear(Number(id), userLogged)
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao desbloquear usuário ${e.message}`})
        }
    }
}

module.exports = new UserApi()