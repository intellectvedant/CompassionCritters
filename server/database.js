import pkg from "pg";
const {Client} = pkg;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "123",
    database: "nodelogin"
})


export default client;


