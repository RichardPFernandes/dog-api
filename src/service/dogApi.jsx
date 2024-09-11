
export default function DogApiService() {
  const url = 'https://api.thedogapi.com/v1/';
  const apiKey = 'live_XjiMXsal2iUDs26Um84wLBtGkMWl8tJbkOJPr4ZUEw7ppBP9ScLj907q4uRrdClj';
  async function getCachorros() {
    const response = await fetch(url + `breeds?api_key=${apiKey}&limit=100`);
    const data = await response.json();
    return data;
  }

  async function buscarRaca(raca) {
    raca
    const response = await fetch(url + `breeds/search?q=${raca}`);
    const data = await response.json();
    return data;
  }

  async function buscarImagem(imageId) {
    const response = await fetch(`https://api.thedogapi.com/v1/images/${imageId}`);
    const data = await response.json();
    return data;
  }

  async function criarFavorito(favorito) {
    const response = await fetch(url + `favourites?api_key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favorito)
    });

    const data = await response.json();
    return data;
  }

  return {
    getCachorros,
    buscarRaca,
    buscarImagem
  }
}