import GeminiService from "./gemini.service.js";

const gemini = new GeminiService();

export async function generateSpaceFactsController(req, res, next) {
  try {
    const facts = await gemini.generateSpaceFacts();
    return res.status(200).json({ facts });
  } catch (error) {
    next(error);
  }
}
