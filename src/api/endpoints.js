import axios from 'axios';
import axiosInstance from './auth';

export const getUser = async (userId) => {

    try {
        const userdata = localStorage.getItem('empdetails');
        const token = JSON.parse(userdata);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
        let resp = await axiosInstance.get(`/getempdetails`, { params: userId });

        console.log("response from endpoints:- ", resp?.status)
        if (resp?.status == 500) {
            localStorage.removeItem("empdetails")
            window.location.href = "/login"
        }
        return resp
    } catch (error) {
        throw error;
    }
};

export const viewTasksPending = async (userId, status, pageNumber) => {


    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/viewtasks-pending`, { params: { id: userId, status: status, pageNumber: pageNumber } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};



export const viewTasksComplete = async (userId, status, pageNumber) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/viewtasks-complete`, { params: { id: userId, status: status, pageNumber: pageNumber } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};


export const viewTasksUnassigned = async (userId, pagenum) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/viewtasks-unassigned?page=${pagenum}`, { params: { id: userId } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};



export const viewTasksAssigned = async (userId, pagenum) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/viewtasks-assigned?page=${pagenum}`, { params: { id: userId } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};


export const recentTasks = async (userId) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/recent-tasks`, { params: { id: userId } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};



export const createdrecentTasks = async (userId) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/created-recent-tasks`, { params: { id: userId } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};



export const markdone = (id) => {
    let resp = axiosInstance.post(`/task/markdone`, { params: id });
    return resp
}

export const viewtaskID = async (id) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/viewtaskbyid`, { params: { id: id } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};


export const updateemployee = (user) => {
    let resp = axiosInstance.post(`/postemployeedetails`, user);
    return resp
}


export const addtask = (body) => {
    let resp = axiosInstance.post(`/task/addtask`, body);
    return resp
}


export const searchusers = async (user) => {

    console.log("frontend search querry", user)
    let resp = await axiosInstance.get(`/searchusers/?q=${user}`);
    return resp
}


export const assignTask = (a, b) => {
    let resp = axiosInstance.post(`/task/assigntask`, { id: b, assignedTo: a });
    return resp
}



export const editTask = async (body) => {
    let resp = await axiosInstance.post(`/task/updatetask`, body)
    return resp
}


export const deleteTask = async (body) => {
    let resp = await axiosInstance.post(`/task/deletetask`, body)
    return resp
}


// New clean logic 👇

const apiController = {
    getUser: async (userId) => {
        try {
            const userdata = localStorage.getItem('empdetails');
            const token = JSON.parse(userdata);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
            let resp = await axiosInstance.get(`/getempdetails`, { params: userId });

            console.log("response from endpoints:- ", resp?.status)
            if (resp?.status == 500) {
                localStorage.removeItem("empdetails")
                window.location.href = "/login"
            }
            return resp
        } catch (error) {
            throw error;
        }
    },

    viewTasksPending: async (userId, status, pageNumber) => {
        try {
            const userdata = localStorage.getItem('empdetails');
            const token = JSON.parse(userdata);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
            let resp = await axiosInstance.get(`/task/viewtasks-pending`, { params: { id: userId, status: status, pageNumber: pageNumber } });
            if (resp?.status == 500) {
                localStorage.removeItem("empdetails")
                window.location.href = "/login"
            }
            return resp
        } catch (error) {
            throw error
        }
    },
    viewTasksComplete: async (userId, status, pageNumber) => {
        try {
            const userdata = localStorage.getItem('empdetails');
            const token = JSON.parse(userdata);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
            let resp = await axiosInstance.get(`/task/viewtasks-complete`, { params: { id: userId, status: status, pageNumber: pageNumber } });
            if (resp?.status == 500) {
                localStorage.removeItem("empdetails")
                window.location.href = "/login"
            }
            return resp
        } catch (error) {
            throw error
        }
    },

    viewTasksUnassigned: async (userId, pagenum) => {


        try {
            const userdata = localStorage.getItem('empdetails');
            const token = JSON.parse(userdata);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
            let resp = await axiosInstance.get(`/task/viewtasks-unassigned?page=${pagenum}`, { params: { id: userId } });
            if (resp?.status == 500) {
                localStorage.removeItem("empdetails")
                window.location.href = "/login"
            }
            return resp
        } catch (error) {
            throw error
        }
    },


    viewTasksAssigned: async (userId, pagenum) => {

        try {
            const userdata = localStorage.getItem('empdetails');
            const token = JSON.parse(userdata);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
            let resp = await axiosInstance.get(`/task/viewtasks-assigned?page=${pagenum}`, { params: { id: userId } });
            if (resp?.status == 500) {
                localStorage.removeItem("empdetails")
                window.location.href = "/login"
            }
            return resp
        } catch (error) {
            throw error
        }

    },


    recentTasks: async (userId) => {

        try {
            const userdata = localStorage.getItem('empdetails');
            const token = JSON.parse(userdata);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
            let resp = await axiosInstance.get(`/task/recent-tasks`, { params: { id: userId } });
            if (resp?.status == 500) {
                localStorage.removeItem("empdetails")
                window.location.href = "/login"
            }
            return resp
        } catch (error) {
            throw error
        }

    },


    createdrecentTasks: async (userId) => {

        try {
            const userdata = localStorage.getItem('empdetails');
            const token = JSON.parse(userdata);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
            let resp = await axiosInstance.get(`/task/created-recent-tasks`, { params: { id: userId } });
            if (resp?.status == 500) {
                localStorage.removeItem("empdetails")
                window.location.href = "/login"
            }
            return resp
        } catch (error) {
            throw error
        }
    },

    markdone: async (id) => {

        try {
            let resp = await axiosInstance.post(`/task/markdone`, { params: id });
            return resp
        } catch (error) {
            throw error
        }

    },



    viewtaskID: async (id) => {

        try {
            const userdata = localStorage.getItem('empdetails');
            const token = JSON.parse(userdata);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
            let resp = await axiosInstance.get(`/task/viewtaskbyid`, { params: { id: id } });
            if (resp?.status == 500) {
                localStorage.removeItem("empdetails")
                window.location.href = "/login"
            }
            return resp
        } catch (error) {
            throw error
        }

    },

    updateemployee: async (user) => {
        try {
            let resp = await axiosInstance.post(`/postemployeedetails`, user);
            return resp
        } catch (error) {
            throw error
        }

    },


    addtask: async (formData) => {
        try {
            let resp = await axiosInstance.post(`/task/addtask`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return resp
        } catch (error) {
            throw error
        }
    },



    searchusers: async (user) => {

        try {
            console.log("frontend search querry", user)
            let resp = await axiosInstance.get(`/searchusers/?q=${user}`);
            return resp
        } catch (error) {
            throw error
        }

    },



    searchusers: async (user) => {

        try {
            console.log("frontend search querry", user)
            let resp = await axiosInstance.get(`/searchusers/?q=${user}`);
            return resp
        } catch (error) {
            throw error
        }

    },




    assignTask: async (a, b) => {
        try {
            let resp = await axiosInstance.post(`/task/assigntask`, { id: b, assignedTo: a });
            return resp
        } catch (error) {
            throw error
        }

    },


    editTask: async (body) => {

        try {

            let resp = await axiosInstance.post(`/task/updatetask`, body)
            return resp
        } catch (error) {
            throw error
        }
    },



    deleteTask: async (body) => {
        try {
            let resp = await axiosInstance.post(`/task/deletetask`, body)
            return resp
        } catch (error) {
            throw error
        }
    },

    resetpasswordlink: async (body) => {
        try {
            let res = await axiosInstance.post('/send-reset-password-link', body)
            return res
        } catch (error) {
            throw error
        }
    },

    resetpassword: async (body) => {
        try {
            let res = await axiosInstance.post('/reset-password', body)
            return res
        } catch (error) {
            throw error
        }
    }
    // Add more functions for other API requests
};

export default apiController;