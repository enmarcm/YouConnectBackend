export enum Routes{
    MAIN = "/",
    AUTH = "/auth",
    CONTACT = "/contact",
    GROUP = "/group",
    PROFILE = "/profile",
}

export enum URLS{
    MAIN = "http://localhost:7878",
    ACTIVATE_USER = `${URLS.MAIN}/auth/activateUser`,
}

export enum Constants{
    ERROR = "error"
}