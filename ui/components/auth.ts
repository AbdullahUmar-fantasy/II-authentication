import { Actor, Identity } from "@dfinity/agent"
import { AuthClient } from "@dfinity/auth-client"
import { JsonnableDelegationChain } from "@dfinity/identity"
import React from "react"
// import { create } from 'zustand';
import { Principal } from "@dfinity/principal"
// import { ConnectPlugWalletSlice } from '@/types/store';
// import { fromNullable } from '@dfinity/utils';
// import { toast } from 'react-toastify';

interface AuthState {
  state: string
  actor: Actor | null
  client: AuthClient | null
}
// interface methodsProps {
//   setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
//   useAuthStore: ReturnType<typeof create>;
//   client?: AuthClient;
//   handleClose?: () => void;
// }

const authMethods = ({
  setIsLoading,
  handleClose,
}: any) => {
  //   const { auth, setAuth, setUserAuth } = useAuthStore((state) => ({
  //     auth: (state as any).auth,
  //     setAuth: (state as any).setAuth,
  //     setUserAuth: (state as any).setUserAuth,
  //   }));

  const initAuth = async () => {
    // logger('INIIITINNNNG');
    // setAuth({ ...auth, isLoading: true });

    const client = await AuthClient.create({
      idleOptions: {
        // idleTimeout: 1000 * 3, // set to 30 minutes
        idleTimeout: 1000 * 60 * 60 * 2 // set to 2 hours
      }
    })
    if (setIsLoading) {
      setIsLoading(true)
      if (await client.isAuthenticated()) {
        const tempAuth = await authenticate(client)
        setIsLoading(false)
        return { success: false, actor: tempAuth }
      } else {
        setIsLoading(false)

        return { success: false }
      }
    }
    return { success: false, actor: null }
  }
  const login = async (navigation: any, callBackfn: () => void) => {
    let ran = false

    if (handleClose && setIsLoading) {
      setIsLoading(true)
      const client = await AuthClient.create({
        idleOptions: {
          idleTimeout: (1000 * 60 * 60) / 2 // set to half an hour
        }
      })
      await client?.login({
        maxTimeToLive: BigInt(1800) * BigInt(1_000_000_000),
        // identityProvider: 'https://identity.ic0.app/#authorize',
        // windowOpenerFeatures:
        //   'toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100',
        identityProvider:
          process.env.NEXT_PUBLIC_DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : `http://${process.env.NEXT_PUBLIC_INTERNET_IDENTITY_CANISTER_ID}.localhost:4943/#authorize`,
        onSuccess: () => {
          authenticate(client as AuthClient).then(() => {
            if (callBackfn) {
              callBackfn()
            }
          })
        },
        onError: () => {
          handleClose()
        }
      })
    } else if (!ran) {
      initAuth()
      ran = true
    } else {
    }
  }

  const authenticate = async (client: AuthClient) => {
    try {
      let myIdentity = client.getIdentity()
      console.log("connectec with principal", myIdentity.getPrincipal())
      //   if (handleClose) handleClose();
    } catch (e) {
      //   setAuth({
      //     ...auth,
      //     state: 'error',
      //   });
      //   if (handleClose) handleClose();
      //   setUserAuth({
      //     name: '',
      //     role: '',
      //     userPerms: null,
      //     rewardPercentage: 0,
      //     email: '',
      //     balance: 0,
      //   });
      console.log(e, "Error while authenticating")
    }
  }

  return {
    initAuth,
    login,
    authenticate
  }
}
export default authMethods
// export default { initAuth, login, logout, authenticate };

// export default { initAuth, login, logout, authenticate };
