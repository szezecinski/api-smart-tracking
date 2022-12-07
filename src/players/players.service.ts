import { v4 as uuid } from 'uuid'
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('player') private readonly playerModel: Model<Player>) { }
    
    async createOrUpdate(dto: CreatePlayerDto): Promise<Player> {
        const player = await this.playerModel.findOne({email: dto.email}).exec()

        if(player != undefined){
            return await this.update(dto)
        }else{
            return await this.create(dto)
        }
    }

    async get(): Promise<Player[]> {
        return await this.playerModel.find().exec()
    }

    async getByEmail(email: string): Promise<Player> {
        const player = await this.playerModel.findOne({email}).exec()
        
        if(!player) {
            throw new NotFoundException('Player not found')
        }

        return player
    }

    async delete(email: string): Promise<any> {
        return await this.playerModel.deleteOne({email}).exec()
    }

    private async create(dto: CreatePlayerDto) : Promise<Player> {
        const player = new this.playerModel(dto)
        return await player.save()
    }

    private async update(dto: CreatePlayerDto) : Promise<Player> {
        return await this.playerModel.findByIdAndUpdate({email: dto.email}, {$set: dto}).exec()
    }
}
