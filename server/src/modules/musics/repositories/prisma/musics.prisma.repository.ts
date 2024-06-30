import { UpdateMusicDto } from '../../dtos/update-music.dto';
import { CreateMusicDto } from '../../dtos/create-music.dto';
import { MusicsRepository } from '../musics.repository';
import { Music } from '../../entities/music.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';

@Injectable()
export class MusicsPrismaRepository implements MusicsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateMusicDto, userId: string): Promise<Music> {
    const music = new Music();
    Object.assign(music, {
      ...data,
    });

    const newMusic = await this.prisma.music.create({
      data: {
        id: music.id,
        album: music.album,
        artist: music.artist,
        genre: music.genre,
        name: music.name,
        year: music.year,
        cover_image: music.cover_image,
        music_url: music.music_url,
        userId,
      },
    });
    return newMusic;
  }

  async findAll(): Promise<Music[]> {
    const musics = await this.prisma.music.findMany({
      where: {
        NOT: {
          cover_image: null,
          music_url: null,
        },
      },
    });
    return musics;
  }

  async findOne(id: string): Promise<Music> {
    const music = await this.prisma.music.findFirst({
      where: { id },
    });
    return music;
  }

  async update(data: UpdateMusicDto, id: string): Promise<Music> {
    const music = await this.prisma.music.update({
      where: { id },
      data: { ...data },
    });
    return music;
  }

  async updateMusic(
    id: string,
    updateMusicDto: UpdateMusicDto,
  ): Promise<Music> {
    const music = await this.prisma.music.update({
      where: {
        id,
      },
      data: {
        ...updateMusicDto,
      },
    });
    return music;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.music.delete({
      where: { id },
    });
  }
}
