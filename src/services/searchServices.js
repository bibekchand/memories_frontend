import api from "../api/axios.js";

export const getSearchResults = async (query) => {
    const response = api.get(`search/${query}`);
    return response;
};

