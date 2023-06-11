import axios from "axios";
import { mainUrl, sign } from ".";

export function signIn({ data }) {
  try {
    return axios({
      method: "GET",
      url: `${mainUrl}/myself`,
      headers: {
        "Content-Type": "application/json",
        key: data?.secret,
        sign: sign({
          url: "myself",
          method: "GET",
          secretKey: data?.secret,
        }),
      },
    }).then((res) => res?.data);
  } catch (err) {
    console.error(err);
  }
}

export function signUp({ data }) {
  try {
    return axios({
      method: "post",
      url: `${mainUrl}/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    }).then((res) => res?.data);
  } catch (err) {
    console.error(err);
  }
}
