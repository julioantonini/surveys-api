import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocols";
import { Request, Response } from "express";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };

    const { statusCode, body }: HttpResponse = await controller.handle(
      httpRequest
    );

    if (statusCode === 200) {
      res.status(statusCode).send(body);
    } else {
      res.status(statusCode).send({ error: body.message });
    }
  };
};
