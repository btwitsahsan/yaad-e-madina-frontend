import axios from "axios";
import { decryptCookie, encryptCookie } from "../utils/cookie";

const DOMAIN = "http://127.0.0.1:4000/api";
// const DOMAIN = "https://yaad-e-madina-admin-backend.vercel.app/api";


export const AdminLogin = async (data: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/admin/login`,
      method: "POST",
      data: data,
    });

    if (resp.status === 200) {
      const token = await resp.data.token;
      // console.log(token);
      encryptCookie("token", token) // Store the token in cookies
      return resp.data;
    }
    return null;
  } catch (err: any) {
    return err.message;
  }
};

export const CreateCategory = async (data: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/createCategory`,
      method: "POST",
      data: data,
      headers:{
        authorization: decryptCookie("token")
      }
    });

    if (resp.status === 200) return resp.data;
    return null;
  } catch (err: any) {
    return err.message;
  }
};


export const dashboardData = async () => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/dashboard`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching Dashboard Data:", error);
    throw error;
  }
};




export const getCategories = async () => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/getAllCategories`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id:any) => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/getCategoryById/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.category;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


export const updateCategory = async (id: any, categoryData: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/updateCategory/${id}`,
      method: "POST",
      data: categoryData,
      headers: {
        authorization: decryptCookie("token")
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};




export const deleteCategory = async (id:any) => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/deleteCategory/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.categories;
  } catch (error) {
    console.error("Error deleting categories:", error);
    throw error;
  }
};




// Naat Khawan 
export const CreateNaatKhawan = async (data: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/createNaatKhawan`,
      method: "POST",
      data: data,
      headers:{
        authorization: decryptCookie("token") 
      }
    });

    if (resp.status === 200) return resp.data;
    return null;
  } catch (err: any) {
    return err.message;
  }
};



export const getNaatKhawans = async () => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/getAllNaatKhawans`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.naatKhawans;
  } catch (error) {
    console.error("Error fetching Naat Khawans:", error);
    throw error;
  }
};



export const getNaatKhawanById = async (id:any) => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/getNaatKhawanById/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.naatKhawan;
  } catch (error) {
    console.error("Error fetching Naat Khawan:", error);
    throw error;
  }
};


export const updateNaatKhawan = async (id: any, categoryData: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/updateNaatKhawan/${id}`,
      method: "POST",
      data: categoryData,
      headers: {
        authorization: decryptCookie("token")
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};






export const deleteNaatKhawan = async (id:any) => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/deleteNaatKhawan/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.categories;
  } catch (error) {
    console.error("Error deleting Naat Khawan:", error);
    throw error;
  }
};



// export const createAlbum = async (albumData:any) => {
//   try {
//     // const response = await axios.post(`${DOMAIN}/api/albums`, albumData);
//     // return response.data;
//     console.log(albumData);
//   } catch (error) {
//     console.error("Error creating album:", error);
//     throw error;
//   }
// };



export const CreateAlbum = async (data: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/createAlbum`,
      method: "POST",
      data: data,
      headers:{
        authorization: decryptCookie("token")
      }
    });

    if (resp.status === 200) return resp.data;
    return null;
  } catch (err: any) {
    return err.message;
  }
};


export const getAlbums = async () => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/getAllAlbum`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.albums;
  } catch (error) {
    console.error("Error fetching Naat Khawans:", error);
    throw error;
  }
};


export const updateAlbum = async (id:any, data:any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/updateAlbum/${id}`,
      method: "POST",
      data: data,
      headers:{
        authorization: decryptCookie("token")
      }
    });

    if (resp.status === 200) return resp.data;
    return null;
  } catch (err:any) {
    console.error("Error updating album:", err);
    throw err;
  }
};

export const getAlbumById = async (id:any) => {
  try {
    // console.log(id);
    const resp = await axios({
      url: `${DOMAIN}/getAlbumById/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });

    if (resp.status === 200) return resp.data.album;
    return null;
  } catch (err:any) {
    console.error("Error fetching album by id:", err);
    throw err;
  }
};




export const deleteAlbum = async (id:any) => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/deleteAlbum/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Error deleting Naat Khawan:", error);
    throw error;
  }
};










export const CreateAudio = async (data: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/createAudio`,
      method: "POST",
      data: data,
      headers:{
        authorization: decryptCookie("token")
      }
    });

    if (resp.status === 200) return resp.data;
    return null;
  } catch (err: any) {
    return err.message;
  }
};


export const getAudios = async () => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/getAllAudio`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.audios;
  } catch (error) {
    console.error("Error fetching Naat Khawans:", error);
    throw error;
  }
};


export const getAudioById = async (id: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/getAudioById/${id}`,
      method: 'POST',
      headers: {
        authorization: decryptCookie('token'),
      },
    });
    return resp.data.audio;
  } catch (error) {
    console.error('Error fetching audio:', error);
    throw error;
  }
};

export const updateAudio = async (id: any, audioData: any) => {
  try {
    console.log(audioData);
    const resp = await axios({
      url: `${DOMAIN}/updateAudio/${id}`,
      method: 'POST',
      data: audioData,
      headers: {
        authorization: decryptCookie('token'),
      },
    });
    return resp.data;
  } catch (error) {
    console.error('Error updating audio:', error);
    throw error;
  }
};



export const deleteAudio = async (id:any) => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/deleteAudio/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Error deleting Naat Khawan:", error);
    throw error;
  }
};












export const createPlaylist = async (data: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/createPlaylist`,
      method: "POST",
      data: data,
      headers:{
        authorization: decryptCookie("token")
      }
    });
// console.log(data)
    if (resp.status === 200) return resp.data;
    return null;
  } catch (err: any) {
    return err.message;
  }
};




export const getPlaylists = async () => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/getAllPlaylist`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.playlists;
  } catch (error) {
    console.error("Error fetching Naat Khawans:", error);
    throw error;
  }
};


export const getPlaylistById = async (id: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/getPlaylistById/${id}`,
      method: 'POST',
      headers: {
        authorization: decryptCookie('token'),
      },
    });
    return resp.data.playlist;
  } catch (error) {
    console.error('Error fetching audio:', error);
    throw error;
  }
};

export const updatePlaylist = async (id: any, playlistData: any) => {
  try {
    console.log(playlistData);
    const resp = await axios({
      url: `${DOMAIN}/updatePlaylist/${id}`,
      method: 'POST',
      data: playlistData,
      headers: {
        authorization: decryptCookie('token'),
      },
    });
    return resp.data;
  } catch (error) {
    console.error('Error updating audio:', error);
    throw error;
  }
};


export const deletePlaylist = async (id:any) => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/deletePlaylist/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Error deleting Naat Khawan:", error);
    throw error;
  }
};







export const CreateSubscriptionPlan = async (data: any) => {
  try {

    const resp = await axios({
      url: `${DOMAIN}/createSubscriptionPlan`,
      method: "POST",
      data: data,
      headers: {
        authorization: decryptCookie("token")
      }
    });

    if (resp.status === 200) return resp.data;
    return null;
  } catch (err: any) {
    return err.message;
  }
};


export const getSubscriptionPlans = async () => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/getAllSubscriptionPlans`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    // console.log(resp.data.plans);
    return resp.data.plans;
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    throw error;
  }
};




export const getSubscriptionPlanById = async (id: any) => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/getSubscriptionPlanById/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    // console.log(resp.data);
    return resp.data.subscriptionPlan;
  } catch (error) {
    console.error("Error fetching subscription plan:", error);
    throw error;
  }
};





export const updateSubscriptionPlan = async (id: any, planData: any) => {
  try {
    const resp = await axios({
      url: `${DOMAIN}/updateSubscriptionPlan/${id}`,
      method: "POST",
      data: planData,
      headers: {
        authorization: decryptCookie("token")
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Error updating subscription plan:", error);
    throw error;
  }
};





export const deleteSubscriptionPlan = async (id: any) => {
  try {
    const resp = await axios({
      url:`${DOMAIN}/deleteSubscriptionPlan/${id}`,
      method: "POST",
      headers:{
        authorization: decryptCookie("token")
      }
    });
    return resp.data.message;
  } catch (error) {
    console.error("Error deleting subscription plan:", error);
    throw error;
  }
};
