import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}
  // *Create a new bookmark
  async createBookmark(bookmarkDto: BookmarkDto) {
    await this.prismaService.bookmark.create({
      data: {
        link: bookmarkDto.link,
        title: bookmarkDto.title,
        description: bookmarkDto.description,
        userId: bookmarkDto.userId,
      },
    });
  }
  //   *Delete a bookmark
  async deleteBookmark(id: number) {
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: id,
      },
    });
    if (bookmark) {
      this.prismaService.bookmark.delete({
        where: {
          id: id,
        },
      });
    }
    throw new NotFoundException('Bookmark not found');
  }

  async getAllBookmarks() {
    const bookmarks = await this.prismaService.bookmark.findMany();
    return bookmarks;
  }

  //   *Get all my  bookmark
  async getMyBookMarks(id: number) {
    const bookmarks = await this.prismaService.bookmark.findMany({
      where: {
        userId: id,
      },
    });
    return bookmarks;
  }
  // * Get Single bookmark
  async getBookMark(id: number) {
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: id,
      },
    });
    if (bookmark) {
      return bookmark;
    }
    throw new NotFoundException('Bookmark not found');
  }
  //   *Update a bookmark
  updateBookmark() {}
}