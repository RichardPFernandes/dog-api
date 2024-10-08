const DogController = require('../controller/dog')

class DogApi {
    async createDog(req, res) {
        const { raca, expec_vida, url_imagem } = req.body

        try {
            const dogs = await DogController.create(raca, expec_vida, url_imagem)
            return res.status(201).send(dogs)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar cachorro: ${e.message}`})
        }
    }

    async updateDog(req, res) {
        const { id } = req.params
        const { raca, expec_vida, url_imagem } = req.body

        try {
            const dogs = await DogController.update(Number(id), raca, expec_vida, url_imagem)
            return res.status(200).send(dogs)
        } catch (e) {
            return res
              .status(400)
              .send({ error: `Erro ao alterar cachorro: ${e.message}` });
        }
    }

    async deleteDog(req, res) {
        const { id } = req.params

        try {
            await DogController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res
              .status(400)
              .send({ error: `Erro ao deletar cachorro: ${e.message}` });
        }
    }

    async findOneDog(req, res) {
        const { id } = req.params
        try {
            const dogs = await DogController.findOne(id);
            return res.status(200).send(dogs)
        } catch (e) {
            return res
              .status(400)
              .send({ error: `Erro ao listar cachorro: ${e.message}` });
        }
    }

    async findAllDogs(req, res) {
        const { page } = req.query
        try {
            const dogs = await DogController.findAll(Number(page));
            return res.status(200).send(dogs);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar personagem: ${e.message}`})
        }
    }
}

module.exports = new DogApi()