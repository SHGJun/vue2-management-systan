/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {*} value Storage值
 * @returns {void}
 */
export const getLocalStorage = (name) => {
    if (localStorage.getItem(name)) {
        return localStorage.getItem(name);
    }
}

/**
 * @description 设置localStorage
 * @param {*} name 
 * @param {*} val 
 */
export const setLocalStorage = (name, val) => {
    localStorage.setItem(name, val);
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 */
export const removeLocalStorage = (name) => {
    if(localStorage.getItem(name)){
        localStorage.removeItem(name);
    }else{
        sessionStorage.removeItem(name);
    }
}

/**
 * @description 清除所有localStorage
 */
export function localClear() {
    window.localStorage.clear();
}


/**
 * @description 判断数据类型
 * @param {*} val 需要判断类型的数据
 * @returns {String}
 */
export function isType(val) {
    if (val === null) return "null";
    if (typeof val !== "object") return typeof val;
    else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 生成唯一 uuid
 * @returns {String}
 */
export function generateUUID() {
    let uuid = "";
    for (let i = 0; i < 32; i++) {
        let random = (Math.random() * 16) | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";
        uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
    }
    return uuid;
}


/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
export function randomNum(min, max) {
    let num = Math.floor(Math.random() * (min - max) + max);
    return num;
}

/**
 * @description 获取当前时间对应的提示语
 * @returns {String}
 */
export function getTimeState() {
    let timeNow = new Date();
    let hours = timeNow.getHours();
    if (hours >= 6 && hours <= 10) return `早上好⛅`;
    if (hours >= 10 && hours <= 14) return `中午好🌞`;
    if (hours >= 14 && hours <= 18) return `下午好🌞`;
    if (hours >= 18 && hours <= 24) return `晚上好🌛`;
    if (hours >= 0 && hours <= 6) return `凌晨好🌛`;
}

/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
    let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
    let defaultBrowserLang = "";
    if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
        defaultBrowserLang = "zh";
    } else {
        defaultBrowserLang = "en";
    }
    return defaultBrowserLang;
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList) {
    let newMenuList = JSON.parse(JSON.stringify(menuList));
    return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList) {
    let newMenuList = JSON.parse(JSON.stringify(menuList));
    return newMenuList.filter(item => {
        item.children?.length && (item.children = getShowMenuList(item.children));
        return !item.meta?.isHide;
    });
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export const getAllBreadcrumbList = (menuList, parent = [], result) => {
    for (const item of menuList) {
        result[item.path] = [...parent, item];
        if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
    }
    return result;
};

/**
 * @description 使用递归处理路由菜单 path，生成一维数组 (第一版本地路由鉴权会用到，该函数暂未使用)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @returns {Array}
 */
export function getMenuListPath(menuList, menuPathArr) {
    for (const item of menuList) {
        if (typeof item === "object" && item.path) menuPathArr.push(item.path);
        if (item.children?.length) getMenuListPath(item.children, menuPathArr);
    }
    return menuPathArr;
}

/**
 * @description 递归查询当前 path 所对应的菜单对象 (该函数暂未使用)
 * @param {Array} menuList 菜单列表
 * @param {String} path 当前访问地址
 * @returns {Object | null}
 */
export function findMenuByPath(menuList, path) {
    for (const item of menuList) {
        if (item.path === path) return item;
        if (item.children) {
            const res = findMenuByPath(item.children, path);
            if (res) return res;
        }
    }
    return null;
}

/**
 * @description 使用递归过滤需要缓存的菜单 name (该函数暂未使用)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} keepAliveNameArr 缓存的菜单 name ['**','**']
 * @returns {Array}
 * */
export function getKeepAliveRouterName(menuList, keepAliveNameArr) {
    menuList.forEach(item => {
        item.meta.isKeepAlive && item.name && keepAliveNameArr.push(item.name);
        item.children?.length && getKeepAliveRouterName(item.children, keepAliveNameArr);
    });
    return keepAliveNameArr;
}



/**
 * @description 处理 prop 为多级嵌套的情况，返回的数据 (列如: prop: user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @returns {*}
 * */
export function handleRowAccordingToProp(row, prop) {
    if (!prop.includes(".")) return row[prop] ?? "--";
    prop.split(".").forEach(item => (row = row[item] ?? "--"));
    return row;
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @returns {String}
 * */
export function handleProp(prop) {
    const propArr = prop.split(".");
    if (propArr.length == 1) return prop;
    return propArr[propArr.length - 1];
}

/**
 * @description 递归查找 callValue 对应的 enum 值
 * */
export function findItemNested(enumData, callValue, value, children) {
    return enumData.reduce((accumulator, current) => {
        if (accumulator) return accumulator;
        if (current[value] === callValue) return current;
        if (current[children]) return findItemNested(current[children], callValue, value, children);
    }, null);
}