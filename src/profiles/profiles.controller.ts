import { Controller, Get, Query } from '@nestjs/common';

@Controller('profiles') //decorator -> higher order function
export class ProfilesController {
    @Get()
    findAll(@Query('age') age:  number) {
        return [{ age }];
    }
}
