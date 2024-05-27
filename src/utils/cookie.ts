import Cookies from "js-cookie";

export function encryptCookie(name: string, value: string) {
  const encryptedValue = btoa(value);
  Cookies.set(name, encryptedValue, { path: '/' });
}

export function decryptCookie(name: string) {
  const encryptedValue = Cookies.get(name);
  if (encryptedValue) {
    return atob(encryptedValue);
  }
  return null;
}

export function clearAllCookies() {
  const cookies = Cookies.get();

  for (const cookie in cookies) {
    Cookies.remove(cookie);
  }
}
