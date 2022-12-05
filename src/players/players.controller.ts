import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

//http://localhost:8080/api/v1/players?email=111
//mongodb-compass
@Controller('api/v1/players')
export class PlayersController {

    constructor(private playerService: PlayersService) { }

    @Post()
    async createOrUpdate(@Body() dto: CreatePlayerDto) : Promise<Player> {
        return await this.playerService.createOrUpdate(dto)
    }

    @Get()
    async getByEmail(@Query('email') email: string): Promise<Player | Player[]> {
        if(email){
            return await this.playerService.getByEmail(email)
        }else{
            return await this.playerService.get()
        }
    }

    @Delete()
    async delete(@Query('email') email: string): Promise<void> {
        await this.playerService.delete(email)
    }

}
