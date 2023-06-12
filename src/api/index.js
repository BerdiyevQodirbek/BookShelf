import Crypto from "crypto-js";
export const mainUrl = "https://no23.lavina.tech";
export const booksUrl = `${mainUrl}/books`;

export function sign({ url, method, secretKey, body }) {
  let sign = `${method}/${url}${secretKey}`;
  return Crypto.MD5(sign).toString();
}
