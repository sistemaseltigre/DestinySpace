import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";

class Login extends React.Component{
    render(){
        return(
            <ThirdwebProvider
                desiredChainId={1}
                authConfig={{
                    // Set this to your domain to prevent signature malleability attacks.
                    domain: "localhost",
                    authUrl: "/api/auth",
                }}
            >
          </ThirdwebProvider>
        )
    }
}

export default Login;




