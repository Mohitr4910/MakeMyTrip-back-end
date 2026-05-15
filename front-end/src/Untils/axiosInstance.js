import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// REQUEST
axiosInstance.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("accessToken");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => Promise.reject(error)
);

// RESPONSE
axiosInstance.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // agar refresh endpoint pe hi error aaye
    if (
      originalRequest.url.includes(
        "/token/refresh/"
      )
    ) {

      return Promise.reject(error);

    }

    // access token expire
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refreshToken =
          localStorage.getItem("refreshToken");

        console.log(
          "OLD REFRESH TOKEN:",
          refreshToken
        );

        // refresh request
        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: refreshToken,
          }
        );

        console.log(
          "NEW ACCESS TOKEN:",
          response.data.access
        );

        // new access token save
        localStorage.setItem(
          "accessToken",
          response.data.access
        );
        if (response.data.refresh) {

            localStorage.setItem(
                "refreshToken",
                response.data.refresh
             );

}

        // new token set
        originalRequest.headers.Authorization =
          `Bearer ${response.data.access}`;

        // retry original request
        return axiosInstance(originalRequest);

      } catch (refreshError) {

        console.log(
          "REFRESH FAILED:",
          refreshError.response?.data
        );

        localStorage.clear();

        window.location.href = "/login";

        return Promise.reject(refreshError);

      }

    }

    return Promise.reject(error);

  }
);

export default axiosInstance;