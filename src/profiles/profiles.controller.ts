import { Controller, Get, Query, Param, Post, Body, Put } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile';
import { UpdateProfileDto } from './dto/update-profile';

@Controller('profiles') //decorator -> higher order function
export class ProfilesController {
    // GET /profiles
    @Get()
    findAll(@Query('age') age: number) {
        return [{ age }];
    }

    // GET /profiles/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id };
    }

    // POST /profiles
    @Post()
    createProfile(@Body() createProfileDto: CreateProfileDto) {
        return {
            name: createProfileDto.name,
            description: createProfileDto.description
        };
    }

    // PUT /profiles/:id
    @Put(':id')
    updateProfile(
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto
    ) {
        return {
            id,
            ...updateProfileDto
        };
    }
}
