export const extractErrorMessages = (error) => {
    if(!error) return null;

    if(error.response?.data){
        const data = error.response.data;
        // handle zod validation errors
        if(data.errors && Array.isArray(data.errors)){
            return data.errors.map(err=>err.message).join(',');
        }
        // handle single error
        if(data.message){
            return data.message;
        }
        // handle input field
        if(data.error){
            return data.error
        }
    }
        // handle network error
        if(error.response && !error.response){
            return "network error, please check your connection"
        }
        // fall back to general error
        if(error.message){
            return error.message
        
        return "something went wrong, please tryagin"
    }
}