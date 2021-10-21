import { navigate } from "@reach/router";

function apiFetch(){


    function request(method: string) {
        return async (url: string, body?: Record<string, any>) => {
            const reqOpts: any = {
                method,
                headers: getAuthHeader()
            }

            if(body) {
                reqOpts.headers['Content-type'] = 'application/json';
                reqOpts.body = JSON.stringify(body)
            }

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, reqOpts);
            return handleResponse(response);
        }
    }

    // get the request header and pass Authorization header if there is a valid toke
    function getAuthHeader() {
        const token = localStorage.getItem('token');
        const isValidToken = !!token

        let authHeaders = {}
        if(isValidToken) {
            authHeaders = {
                Authorization: `${token}`
            }
        }

        return authHeaders;
    }

    async function handleResponse(response: Response) {
        const res = await response.json();
        const token = localStorage.getItem('token');
        
        if([401, 403].includes(response.status) && token) {
            localStorage.removeItem('token')
            navigate('/login', {replace: true})
        } else {
            return res;
        }
    }

    // add other request types if needed
    return {
        get: request('GET'),
        post: request('POST')
    }
   
}

export default apiFetch()

