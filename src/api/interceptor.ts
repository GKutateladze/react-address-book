import Axios from "axios-observable";
import {AxiosRequestConfig} from "axios";

export const intercept = () => {
    Axios.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            if (process.env.REACT_APP_HOST) {
                config.url = process.env.REACT_APP_HOST
            }
            return config
        }
    )
};
