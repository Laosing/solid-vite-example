import fs from "fs"
import path from "path"
import express from "express"
import { createServer as createViteServer } from "vite"
import { fileURLToPath } from "url"
import http from "http"
import { db } from "./db.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isDevEnv = process.env.NODE_ENV === "development"

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function getUsers() {
  const allUsers = await db.user.findMany()
  await db.$disconnect()
  return allUsers
}

app.get("/users", async (req, res) => {
  const users = await getUsers()
  return res.json(users)
})
app.post("/users/new", async (req, res) => {
  const users = await getUsers()
  return res.json(users)
})
app.get("/games", async (req, res) => {
  const users = await getUsers()
  return res.json(users)
})
app.post("/games/new", async (req, res) => {
  const users = await getUsers()
  return res.json(users)
})

if (isDevEnv) {
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" }
  })
  app.use(vite.middlewares)
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      )
      template = await vite.transformIndexHtml(url, template)
      res.status(200).set({ "Content-Type": "text/html" }).end(template)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })
} else {
  app.use(express.static(path.join(__dirname, "dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"))
  })
}

const port = process.env.PORT || "8080"
server.listen(port, () => console.log(`listening on port ${port}`))
