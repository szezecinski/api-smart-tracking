import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PlayersModule,
    MongooseModule.forRoot(process.env.CONNECTION_STRING)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
