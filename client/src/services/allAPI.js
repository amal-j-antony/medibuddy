import axiosConfig from "./axiosConfig";

const serverURL = 'https://medibuddy-sfwa.onrender.com'

//add record
export const addRecordAPI = async (reqBody) => {
    return await axiosConfig("POST",`${serverURL}/records`,reqBody)
}

//get records
export const getRecordsAPI = async () => {
    return await axiosConfig("GET",`${serverURL}/records`,{})
}

//edit record
export const editRecordAPI = async (reqBody ,recordId) => {
    return await axiosConfig("PUT", `${serverURL}/records/${recordId}`,reqBody)
}

//delete Record
export const deleteRecordAPI = async (recordId) => {
    return await axiosConfig("DELETE",`${serverURL}/records/${recordId}`,{})
}