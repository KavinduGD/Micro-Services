import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    //we are on the server
    //requests shpud be made to http://ingess-nginx.ingress-nginx..............

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    //we are on the browser
    //request can be made with a base url ""
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
