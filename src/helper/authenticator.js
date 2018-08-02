import decode from 'jwt-decode';

const authenticator = {
  checkAuth: () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh');

    if (!token || !refreshToken) {
      return false;
    }

    
    try {
      // { exp: 12903819203 }

      const { exp } = decode(token);
      
      if (exp < new Date().getTime() / 1000) {
        return false;
        
      }
  
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
  
}

export default authenticator