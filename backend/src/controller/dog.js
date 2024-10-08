const dog = require("../model/dog");

class DogController {
  async create(raca, expec_vida, url_imagem) {
    if (!raca || !url_imagem) {
      throw new Error("Dados obrigatórios não preenchidos.");
    }

    const dogValue = await dog.create({
      raca,
      expec_vida: expec_vida || null,
      url_imagem,
    });

    return dogValue;
  }

  async findOne(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const dogBase = await dog.findByPk(id);

    if (!dogBase) {
      throw new Error("Cachorro não encontrado.");
    }

    return dogBase;
  }

  async findAll(page = 1) {
    try {
      const limit = 20;
      const offset = (page - 1) * limit;
      const { count, rows: dogsBase } = await dog.findAndCountAll(
        { limit, offset }
      );

      if (page === 1 && dogsBase.length <= 0) {
        let page = 1;
        let hasMore = true;
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        while (hasMore) {
          try {
            const response = await fetch(
              `https://api.thedogapi.com/v1/breeds?page=${page}&limit=${limit}&api_key=live_XjiMXsal2iUDs26Um84wLBtGkMWl8tJbkOJPr4ZUEw7ppBP9ScLj907q4uRrdClj`,
              requestOptions
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data?.info?.next) {
              hasMore = false;
            }
            console.log(data);

            data.map((it) => {
              dog.create({
                id: it.id,
                raca: it.name,
                expec_vida: it.life_span,
                url_imagem: it.image.url,
              });
            });
            page++;
          } catch (error) {
            hasMore = false;
          }
        }
      }

      const pages = Math.ceil(count / limit);

      const result =
        page <= pages
          ? {
              info: {
                count: count,
                pages: pages,
                next:
                  pages == page
                    ? null
                    : `http://localhost:3000/api/v1/dog/?page=${
                        page + 1
                      }`,
                prev:
                  page == 1
                    ? null
                    : `http://localhost:3000/api/v1/dog/?page=${page}`,
              },
              results: dogsBase,
            }
          : {
              info: {
                count: count,
                pages: pages,
                next: `http://localhost:3000/api/v1/character/?page=${1}`,
                prev: `http://localhost:3000/api/v1/character/?page=${1}`,
              },
              results: [],
            };

      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Página não encontrada, tente novamente");
    }
  }

  async update(id, raca, expec_vida, url_imagem) {
    const dogBase = await dog.findByPk(id);

    if (!dogBase) {
      throw new Error("Cachorro não encontrado!");
    }

    dogBase.raca = raca || dogBase.raca;
    dogBase.expec_vida = expec_vida;
    dogBase.url_imagem = url_imagem || dogBase.url_imagem;
    dogBase.save();

    return dogBase;
  }

  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const dogBase = await this.findOne(id);
    dogBase.destroy();

    return;
  }
}

module.exports = new DogController();
