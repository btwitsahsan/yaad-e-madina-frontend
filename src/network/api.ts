import axios from "axios";

// import { decryptCookie, encryptCookie } from "../utils/cookie";
import Cookies from "js-cookie";


// const DOMAIN = "http://127.0.0.1:4000/api"
const DOMAIN = "https://yaad-e-madina-admin-backend.vercel.app/api"
// const token = decryptCookie("token");
// const headers = {
//   authorization: `Bearer ${token}`,
// };

const token = Cookies.get("token");
const headers = {
  authorization: token,
};

export const AdminLogin = async (data: any) => {
    try {
      const resp = await axios({
        url: `${DOMAIN}/admin/login`,
        method: "POST",
        data: data,
      });
// console.log(resp.data);
if (resp.status === 200) {
  const token = resp.data.token;
  console.log(token);
  // encryptCookie("token", token);  // Encrypt and set the token in the cookie
  Cookies.set("token", token);  // Encrypt and set the token in the cookie
  return resp.data;
}
return null;
    } catch (err: any) {
      return err.message;
    }
  };



  export const CreateCategory = async (data: any) => {
    console.log(headers);
    try {
      const resp = await axios({
        url: `http://localhost:4000/api/createCategory`,
        method: "POST",
        data: data,
        headers
      });
      // console.log(resp);
      if (resp.status === 200) return resp.data;
      return null;
    } catch (err: any) {
      return err.message;
    }
  };
  





  
  // const headers = {
  //     "x-api-key": "d108b40a-990d-4130-a977-fac12ed019c1",
  //   };
  
  // export const CreateAdmin = async (data: any) => {
  //     try {
  //       const resp = await axios({
  //         url: `${DOMAIN}/owner/createAdmin`,
  //         method: "POST",
  //         data: data,
  //         headers
  //       });
  //       console.log(resp.data);
  //       if (resp.status === 200) return resp.data;
  //       return null;
  //     } catch (err: any) {
  //       return err.message;
  //     }
  //   };
    