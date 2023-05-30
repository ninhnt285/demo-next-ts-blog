import Cookie from "js-cookie";

export async function getAuthHeader() {
  const token = await getToken();
  if (token) {
    return {Authorization: `Bearer ${token || ''}`};
  } else {
    return {};
  }
}

export async function getToken() {
  try {
    const token = Cookie.get("token");
    return token;
  } catch (err) {
    return null;
  }
}

export async function setToken(token: string | null | undefined) {
  if (token === null || token === undefined) {
    Cookie.remove("token", {sameSite: "None", secure: true});
    return;
  }
  Cookie.set("token", token, {sameSite: 'None', secure: true});
}

export async function removeToken() {
  await setToken(null);
}
