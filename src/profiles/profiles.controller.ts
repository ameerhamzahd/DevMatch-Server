import {
    Controller,
    Get,
    Query,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }

    // GET /profiles
    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    // GET /profiles/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profilesService.findOne(Number(id));
    }

    // POST /profiles
    @Post()
    createProfile(@Body() createProfileDto: CreateProfileDto) {
        return this.profilesService.createProfile(createProfileDto);
    }

    // PUT /profiles/:id
    @Put(':id')
    updateProfile(
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.profilesService.updateProfile(
            Number(id),
            updateProfileDto,
        );
    }

    // DELETE /profiles/:id
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteProfile(@Param('id') id: string) {
        return this.profilesService.deleteProfile(Number(id));
    }
}