import Crypto from "crypto-js";
import axios from "axios";
import { mainUrl, sign } from ".";

export function getBooks({ key }) {
  try {
    return axios({
      method: "get",
      url: `${mainUrl}/books`,
      headers: {
        key: key?.key,
        sign: `${sign({
          url: "books",
          method: "GET",
          secretKey: key?.secret,
        })}`,
      },
    }).then((res) => res?.data);
  } catch (err) {
    console.error(err);
  }
}

export function addBook({ data, key }) {
  try {
    let sign = `POST/books${JSON.stringify(data)}${key?.secret}`;
    return axios({
      method: "post",
      url: `${mainUrl}/books`,
      headers: {
        "Content-Type": "application/json",
        key: key?.key,
        sign: Crypto.MD5(sign).toString(),
      },
      data: data,
    }).then((res) => res?.data);
  } catch (err) {
    console.error(err);
  }
}

export function updateBook({ key, id, status }) {
  try {
    let sign = `PATCH/books/${id}${status}${key?.secret}`;
    return axios({
      method: "PATCH",
      url: `${mainUrl}/books/${id}`,
      headers: {
        "Content-Type": "application/json",
        key: key?.key,
        sign: Crypto.MD5(sign).toString(),
      },
      data: JSON.parse(status),
    }).then((res) => res?.data);
  } catch (err) {
    console.error(err);
  }
}

export function deleteBook({ key, id }) {
  try {
    let sign = `DELETE/books/${id}${key.secret}`;

    return axios({
      method: "delete",
      url: `${mainUrl}/books/${id}`,
      headers: {
        key: key?.key,
        sign: Crypto.MD5(sign).toString(),
      },
    }).then((res) => res?.data);
  } catch (err) {
    console.error(err);
  }
}
