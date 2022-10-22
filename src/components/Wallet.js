import {
  useAddress,
  useUser,
  useLogin,
  useLogout,
  useMetamask,
} from "@thirdweb-dev/react";

const Wallet = () => {
  const address = useAddress();
  const connect = useMetamask();

  const login = useLogin();
  const logout = useLogout();
  const { user } = useUser();

  return (
    <div>
      {address ? (
        <>
          <button onClick={() => login()}>Login with Wallet</button>
          <button onClick={logout}>Logout</button>
          <pre>User: {JSON.stringify(user || null)}</pre>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Wallet;
