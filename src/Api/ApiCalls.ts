import axios from "axios";
import { clear } from "../utils/utils";

const baseUrl = "https://frontend-test-api.aircall.io";

export const getData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/calls`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return response;
  } catch (error: any) {
    console.log("error", error);
    if (error?.response && error?.response.status === 401) {
      clear();
    }
  }
};

export const siginCall = async (userName: string, password: string) => {
  try {
    return await axios.post(`${baseUrl}/auth/login`, {
      username: userName,
      password: password,
    });
  } catch (error: any) {
    console.log("error", error);
    if (error.response && error.response.status === 401) {
      clear();
    }
  }
};

export const getPaginationData = async (offset: number) => {
  try {
    return await axios.get(`${baseUrl}/calls?offset=${offset}&limit=10`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  } catch (error: any) {
    console.log("error", error);
    if (error?.response && error.response.status === 401) {
      clear();
    }
  }
};

export const addNote = async (id: string, note: string) => {
  try {
    return await axios.post(
      `${baseUrl}/calls/${id}/note`,
      { content: note },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error: any) {
    console.log("error", error);
    if (error.response && error.response.status === 401) {
      clear();
    }
  }
};

export const archiveCall = async (id: string) => {
  try {
    return await axios.put(
      `${baseUrl}/calls/${id}/archive`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error: any) {
    console.log("error", error);
    if (error.response && error.response.status === 401) {
      clear();
    }
  }
};
