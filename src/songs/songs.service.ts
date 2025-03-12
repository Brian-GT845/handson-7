import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './create-song.dto';
import { Song } from './song.entity';

@Injectable()
export class SongsService {
    private currentId : number = 0;
    private songs: Song[] = [];

    create(CreateSongDTO : CreateSongDTO){
        const song: Song = {
            id : this.currentId,
            title : CreateSongDTO.title,
            artist : CreateSongDTO.artist
        }
        ++this.currentId;
        this.songs.push(song);
    }

    findAll() : Song[]{
        return this.songs
    }

    findOne(id :number) : Song[]{
        return this.songs.filter((song) => song.id == id)
    }

    delete(id: number){
        this.songs = this.songs.filter((song) => song.id != id);
    }

    updateOne(id: number, createSondDTO : CreateSongDTO){
        this.songs.forEach((song) =>{
            if(song.id == id){
                song.artist = createSondDTO.artist;
                song.title = createSondDTO.title;
            }
        });
    }
}