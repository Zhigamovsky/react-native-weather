import { ErrorTranslater } from "../types/contexts/http"

export const ERROR_TRANSLATER: ErrorTranslater = (error, skip) => {
  let errorMessage = 'Something went wrong. Check your Internet connection and try again!'

  if(!error?.response) {
    return {
      error,
      skip,
      code: -500,
      message: errorMessage
    }
  }
  else {
    switch(error.response.status) {
      case 200: 
        errorMessage = 'OK'
        break
    
      case 400: 
        errorMessage = 'Check the correctness of the entered data'
        break
    
      case 401: 
        errorMessage = 'Invalid token'
        break
    
      case 403: 
        errorMessage = 'There is a problem with the server. The given url could not be processed.';
        break
        
      case 404: 
        errorMessage = 'Data not found.'
        break
    
      case 422: 
        errorMessage = 'Data not found'
        break
    
      case 429: 
        errorMessage = 'Your account is temporary blocked due to exceeding of requests limitation of your subscription type'
        break
    
      case 500: 
        errorMessage = 'There are problems with the server or with the connection. Try later!'
        break
        
      default: 
        errorMessage = 'Something went wrong. Try again!'

    }
    return {
      error,
      skip,
      code: error.response.status,
      message: errorMessage
    };
  }
}