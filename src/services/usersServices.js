import { getCookie } from "../helpers/cookie";
import { get, getId, post,getTopicId } from "../utils/request";

export const checkLogin = async(email,password) => {
    const response = await get(`users?email=${email}&password=${password}`);
    return response;
}

export const checkExistedEmail = async (email) => {
    const response = await get(`users?email=${email}`);
    return response;
}

export const getListUsers= async() => {
    const response = await get("users");
    return response;
}

export const getListTopics = async() => {
    const response = await get("topics");
    return response;
}

export const getListQuestions = async() => {
    const response = await get("questions");
    return response;
}

export const getListAnswers = async() => {
    const idUser = getCookie("id");
    const response = await get(`answers?userId=${idUser}`);
    return response;
}

export const postListUsers = async(options) => {
    const response = await post("users",options);
    return response;
}


export const getListId = async(id) => {
    const response = await getId("topics",id);
    return response;
}

export const getQuestions = async(id) => {
    const response = await getTopicId("questions",id);
    return response;
}



export const postListAnswers = async(options) => {
    const response = await post("answers",options);
    return response;
}


export const getAnswerId = async(id) => {
    const response = await getId("answers",id);
    return response;
}