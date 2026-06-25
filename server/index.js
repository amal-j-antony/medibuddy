const jsonServer = requre("json-server")

const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

const PORT = process.env.PORT || 3000
server.use(middlewares)
server.use(router)

server.listen(PORT => {
    console.log(`Server running at ${PORT}`);
    
})