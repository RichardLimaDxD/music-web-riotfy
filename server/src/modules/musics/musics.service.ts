import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { MusicsRepository } from './repositories/musics.repository';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs';

@Injectable()
export class MusicsService {
  constructor(private musicsRepository: MusicsRepository) {}
  async create(data: CreateMusicDto, userId: string, isAdmin: boolean) {
    if (isAdmin === false) {
      throw new UnauthorizedException('Only admins can create songs');
    }

    return await this.musicsRepository.create(data, userId, isAdmin);
  }

  async findAll() {
    return await this.musicsRepository.findAll();
  }

  async findOne(id: string) {
    const music = await this.musicsRepository.findOne(id);
    if (!music) {
      throw new NotFoundException('Music not found!');
    }
    return music;
  }

  async update(
    cover_image: Express.Multer.File,
    music: Express.Multer.File,
    id: string,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const findMusic = await this.musicsRepository.findOne(id);

    if (!findMusic) {
      throw new NotFoundException('Music not found!');
    }

    const uploadImage = await cloudinary.uploader.upload(
      cover_image.path,
      { resource_type: 'image' },
      (error, result) => {
        return result;
      },
    );

    const uploadMusic = await cloudinary.uploader.upload(
      music.path,
      { resource_type: 'video' },
      (error, result) => {
        return result;
      },
    );

    const updateMusic = await this.musicsRepository.update(
      {
        cover_image: uploadImage.secure_url,
        music_url: uploadMusic.secure_url,
      },
      id,
    );

    unlink(cover_image.path, (error) => {
      if (error) {
        console.log(error);
      }
    });

    unlink(music.path, (error) => {
      if (error) {
        console.log(error);
      }
    });

    return updateMusic;
  }

  async updateMusic(id: string, updateMusicDto: UpdateMusicDto) {
    const findMusic = await this.musicsRepository.findOne(id);

    if (!findMusic) {
      throw new NotFoundException('Music not found');
    }

    return this.musicsRepository.updateMusic(id, updateMusicDto);
  }

  async remove(id: string, isAdmin: boolean) {
    const findMusic = await this.musicsRepository.findOne(id);

    if (isAdmin === false) {
      throw new ForbiddenException('Insufficient permission');
    }

    if (!findMusic) {
      throw new NotFoundException('Music not found!');
    }

    return this.musicsRepository.delete(id, isAdmin);
  }
}
