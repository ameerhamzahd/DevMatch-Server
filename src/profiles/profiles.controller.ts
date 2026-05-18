import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('profiles') //decorator -> higher order function
export class ProfilesController {
    // GET /profiles
    @Get()
    findAll(@Query('age') age:  number) {
        return [{ age }];
    }

    // GET /profiles/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id };
    }
}
