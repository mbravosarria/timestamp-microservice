const express = require("express")
const path = require("path")

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, "public")))

app.get("/api/", (req, res) => {
  const date = new Date()
  res.send({
    unix: date.getTime(),
    utc: date.toUTCString(),
  })
})

app.get("/api/:date", (req, res) => {
  try {
    const date = new Date(
      req.params.date.indexOf("-") !== -1
        ? req.params.date
        : parseInt(req.params.date)
    )
    const utc = date.toUTCString()

    utc === "Invalid Date"
      ? res.send({ error: utc })
      : res.send({
          unix: date.getTime(),
          utc: date.toUTCString(),
        })
  } catch (error) {
    res.send({ error: "Invalid Date" })
  }
})

app.listen(port, () => {
  console.log(`Timestamp microservice listening on port ${port}`)
})
