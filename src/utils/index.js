export const getLocalStorage = (name)=>{
    if(localStorage.getItem(name)) {
        return localStorage.getItem(name);
    }
}

export const setLocalStorage = (name,val)=>{
    localStorage.setItem(name,val);
}

export const removeLocalStorage = (name)=>{
    localStorage.removeItem(name);
}