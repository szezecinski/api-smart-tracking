import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
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
    async create(@Body() dto: CreatePlayerDto) : Promise<Player> {
        return await this.playerService.create(dto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async update(@Body() dto: CreatePlayerDto,
                 @Param('_id',PlayersValidationParamsPipe) _id: string) : Promise<Player> {
        return await this.playerService.update(_id,dto)
    }

    @Get('/:_id')
    async getById(@Param('_id', PlayersValidationParamsPipe) _id: string): Promise<Player> {
        return await this.playerService.getById(_id)
    }

    @Get()
    async getAll(): Promise<Player[]> {
        return await this.playerService.get()
    }

    @Delete('/:_id')
    async delete(@Param('_id', PlayersValidationParamsPipe) _id: string): Promise<void> {
        await this.playerService.delete(_id)
    }

}
