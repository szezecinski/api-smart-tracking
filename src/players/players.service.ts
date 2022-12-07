import { v4 as uuid } from 'uuid'
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('player') private readonly playerModel: Model<Player>) { }
    
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

    async getById(_id: string): Promise<Player> {
        const player = await this.playerModel.findOne({_id}).exec()
        
        if(!player) {
            throw new NotFoundException('Player not found')
        }

        return player
    }

    async delete(_id: string): Promise<any> {
        //checking if it exists
        await this.getById(_id)
        
        return await this.playerModel.deleteOne({_id}).exec()
    }

    async create(dto: CreatePlayerDto) : Promise<Player> {
        const playerExists = await this.getPlayer(dto.email)
        
        if(playerExists){
            throw new NotFoundException('Player already exists')
        }

        const player = new this.playerModel(dto)
        return await player.save()
    }

    async update(_id: string, dto: CreatePlayerDto) : Promise<Player> {
        //checking if it exists
        await this.getById(_id)

        return await this.playerModel.findByIdAndUpdate({ _id }, {$set: dto}).exec()
    }

    private async getPlayer(email: string): Promise<Player> {
        return await this.playerModel.findOne({email})
    }
}
