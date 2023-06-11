import Crypto from "crypto-js";
export const mainUrl = "https://no23.lavina.tech";
export const booksUrl = `${mainUrl}/books`;

export function sign({ url, method, secretKey }) {
  let sign = `${method}/${url}${secretKey}`;
  return Crypto.MD5(
    // `${method}/${url}{"isbn":"9781118464465"}${secretKey}`
    sign
  ).toString();
}
