export interface TransacaoAPI {
  "Cliente Novo": number;
  Data: string;
  Email: string;
  "Forma de Pagamento": string;
  ID: number;
  Nome: string;
  Status: string;
  "Valor (R$)": string;
}

export interface Transacao {
  newClient: boolean;
  date: string;
  email: string;
  paymentMethod: string;
  id: number;
  name: string;
  status: string;
  value: number;
}
