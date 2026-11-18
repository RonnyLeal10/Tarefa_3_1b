import API_URL from "./config.js";

export const sponsorService = {
  async getSponsors(token) {
    const response = await fetch(`${API_URL}/sponsors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async addSponsor(token, payload) {
    const response = await fetch(`${API_URL}/sponsors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async editSponsor(token, payload) {
    const response = await fetch(`${API_URL}/sponsors/${payload._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async removeSponsor(token, id) {
    const response = await fetch(`${API_URL}/sponsors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  }
};

function handleResponses(code) {
  switch (code) {
    case 401:
      return "Não está autorizado a executar esta ação!";
    case 404:
      return "Patrocinador não encontrado!";
    case 406:
      return "Verifica se preencheste corretamente os campos!";
    case 409:
      return "Já existe um patrocinador com estes dados!";
    default:
      return `Erro ao comunicar com o servidor (${code}).`;
  }
}

export default sponsorService;
