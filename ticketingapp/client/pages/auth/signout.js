import { useRouter } from "next/router";
import useRequestHook from "../../hooks/use-request";
import { useEffect } from "react";

const logout = () => {
  const router = useRouter();
  const { doRequest } = useRequestHook({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      router.push("/");
    },
  });

  useEffect(() => {
    doRequest();
  }, []);
  return <div>Sign out mf</div>;
};

export default logout;
