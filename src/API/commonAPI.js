import axios from "axios";
const api = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

// POST , PUT  APIS

const login = async (url, data) => {
  try {
    const result = await axios.post(
      `${api}/${url}`,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { status, message, desc, token } = result.data;
    return { status, message, desc, token };
  } catch (error) {
    if (error?.response?.data) {
      const { status, message, desc } = error.response.data;
      return { status, message, desc };
    } else {
      return {
        status: false,
        message: "Techincal Issue!",
        desc: "Something went wrong!",
      };
    }
  }
};

// const postAPI = async (url, data) => {
//   try {
//     const result = await axios.post(
//       `${api}/${url}`,
//       { ...data },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     const { status, message, desc } = result.data;
//     return { status, message, desc };
//   } catch (error) {
//     if (error?.response?.data?.status == false) {
//       const { status, message, desc } = error.response.data;
//       return { status, message, desc };
//     } else {
//       return {
//         status: false,
//         message: "Technical Issue",
//         desc: "technical issue! please try again later",
//       };
//     }
//   }
// };


const postAPI = async (url, data) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    // Check if data is a FormData object to set the correct Content-Type
    if (data instanceof FormData) {
      // For FormData, let Axios set the Content-Type automatically (multipart/form-data)
    } else {
      // For regular JSON data
      config.headers["Content-Type"] = "application/json";
      data = { ...data }; // Spread into a plain object for JSON requests
    }

    const result = await axios.post(`${api}/${url}`, data, config);
    const { status, message, desc } = result.data;
    return { status, message, desc };
  } catch (error) {
    if (error?.response?.data?.status === false) {
      const { status, message, desc } = error.response.data;
      return { status, message, desc };
    } else {
      return {
        status: false,
        message: "Technical Issue",
        desc: "Technical issue! Please try again later",
      };
    }
  }
};

const getAPI = async (url) => {
  try {
    const result = await axios.get(`${api}/${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    if (error?.response?.data?.status === false) {
      const { status, message, desc } = error.response.data;
      return { status, message, desc };
    } else {
      return {
        status: false,
        message: "Technical Issue",
        desc: "technical issue! please try again later",
      };
    }
  }
};

const deleteAPI = async (url, data) => {
  try {
    const result = await axios.delete(
      `${api}/${url}`,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { status, message, desc } = result.data;
    return { status, message, desc };
  } catch (error) {
    console.log(error);
    console.log(error.message);
    if (error?.response?.data?.status === false) {
      const { status, message, desc } = error.response.data;
      return { status, message, desc };
    } else {
      return {
        status: false,
        message: "Technical Issue",
        desc: "technical issue! please try again later",
      };
    }
  }
};

export { login, postAPI, getAPI, deleteAPI };
