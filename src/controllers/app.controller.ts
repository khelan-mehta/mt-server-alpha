import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // need to implement few api's such as server health as well as meta info api's for app

  @Get("health")
  getServerHealth(@Res() res: Response): Response {
    return res.status(200).send({ sts: true, msg: this.appService.getHello()});
  }

  // @Get("order")
  // getOrder(@Res() res: Response): Response{
  //   return r
  // }
}
