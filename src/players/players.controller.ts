import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';
import { PlayersService } from './players.service';

//mongodb-compass
@Controller('api/v1/players')
export class PlayersController {

    constructor(private playerService: PlayersService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createOrUpdate(@Body() dto: CreatePlayerDto) : Promise<Player> {
        return await this.playerService.createOrUpdate(dto)
    }

    @Get()
    async getByEmail(@Query('email', PlayersValidationParamsPipe) email: string): Promise<Player | Player[]> {
        if(email){
            return await this.playerService.getByEmail(email)
        }else{
            return await this.playerService.get()
        }
    }

    @Delete()
    async delete(@Query('email', PlayersValidationParamsPipe) email: string): Promise<void> {
        await this.playerService.delete(email)
    }

}
