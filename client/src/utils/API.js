import axios from 'axios'

const API = {
    getCertifications: async _ => (await axios.get('api/getCertifications')).data,
    getEducation: async _ => (await axios.get('api/getEducation')).data,
    getProjects: async _ => (await axios.get('api/getProjects')).data,
    getReferences: async _ => (await axios.get('api/getReferences')).data,
    getSkills: async _ => (await axios.get('api/getSkills')).data,
    getWorkHistory: async _ => (await axios.get('api/getWorkHistory')).data,
    /// ADMIN ///
    checkAdminKey: async key => (await axios.get('/api/checkAdminKey/' + key)).data,
    addRecord: async (table, data) => (await axios.post('api/addRecord/' + table, data)).data,
    updateRecord: async (table, id, data) => (await axios.put(`api/updateRecord/${table}/${id}`, data)).data,
    deleteRecord: async (table, id) => (await axios.delete(`api/deleteRecord/${table}/${id}`)).data
}

export default API