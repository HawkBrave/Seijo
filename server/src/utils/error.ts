import express from 'express'

export function errorHandler(
  err: any, 
  _request: express.Request, 
  response: express.Response, 
  _next: express.NextFunction
) {
  console.log(err)
  response.status(500).send("Error: " + err)
}