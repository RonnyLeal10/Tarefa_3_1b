import API_URL from "./config";

export const expertService = {
  async getExperts(token) {
    const response = await fetch(`${API_URL}/experts`, {
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

  async addExpert(token, payload) {
    const response = await fetch(`${API_URL}/experts`, {
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

  async editExpert(token, payload) {
    const response = await fetch(
      `${API_URL}/experts/${payload._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(payload)
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async removeExpert(token, id) {
    const response = await fetch(`${API_URL}/experts/${id}`, {
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
      return "Especialista não encontrado!";
    case 406:
      return "Verifique se preencheu corretamente os campos!";
    case 409:
      return "Este especialista já existe!";
    default:
      return `Erro ao comunicar com o servidor (${code}).`;
  }
}

export default expertService;
