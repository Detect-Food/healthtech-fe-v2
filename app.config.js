

const IP = "192.168.100.126";

export default {
    name: "My App",
    version: "1.0.0",
    extra: {
        healthTechApi: `http://${IP}:5000`,
        fact: "kittens are cool",
    },
};
