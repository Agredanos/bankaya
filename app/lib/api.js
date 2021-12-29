
const GlobalHost = "https://pokeapi.co"
class Api {
  static headers() {
    return {
      'Content-Type': 'application/json'
    }
  }
  static get(route,headers=null) {
    return this.xhr(route, null,headers,'GET');
  } 
  static put(route, params,headers=null) {
    return this.xhr(route, params,headers, 'PUT')
  }  
  static post(route, params,headers=null) {
    return this.xhr(route, params,headers, 'POST')
  }  
  static delete(route, params,headers=null) {
    return this.xhr(route, params,headers,'DELETE')
  }  
  static xhr(route, params,headers, verb) {
    const host = GlobalHost;
    const url = `${host}/api/v2/${route}`;
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers()
    if(headers != null){
      options.headers['auth'] = headers['strToken'];
    }
    return fetch(url, options).then( resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }else{
        console.log("Error",resp);
        return {};
      }
    }).catch( ex => console.log("Error en peticion",ex) );
  }
}
export default Api