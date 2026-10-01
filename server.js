const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const mensaje = req.body.message;

    if (!mensaje) {
      return res.status(400).json({
        error: "Escribe un mensaje."
      });
    }

    const respuesta = await client.responses.create({
      model: "gpt-4o-mini",
      input: mensaje
    });

    res.json({
      reply: respuesta.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Emajasson no pudo responder en este momento."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Emajasson está funcionando 🤖");
});
