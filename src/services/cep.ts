import axios from "axios";

export async function getCep(cep: string) {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
  return response
}

