import { fetchRefresh } from "../api/auth";
import { createRefreshParamInterface, AuthStateUserObject, RefreshTokenCallbackResponse } from 'react-auth-kit/dist/types';

export const refreshCallback: createRefreshParamInterface = {
  interval: 1,
  refreshApiCallback: async function (param: {
    authToken?: string;
    authTokenExpireAt?: Date;
    refreshToken?: string;
    refreshTokenExpiresAt?: Date;
    authUserState: AuthStateUserObject | null;
}): Promise<RefreshTokenCallbackResponse> {
    try {
      const response = await fetchRefresh()
      if (response === undefined) {
        throw new Error("token is undefined")
      }
      return {
        isSuccess: true,
        newAuthToken: response.token,
      }
    }
    catch(error){
      console.error(error)
      return {
        newAuthToken: "",
        isSuccess: false
      }
    }
  }
}

