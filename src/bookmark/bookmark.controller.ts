import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Post()
  async createBookmark(@Body() bookmarkDto: BookmarkDto) {
    return await this.bookmarkService.createBookmark(bookmarkDto);
  }

  @Delete()
  async deleteBookmark(@Body() id: number) {
    return await this.bookmarkService.deleteBookmark(id);
  }
  @Get()
  async getSingleBookmark(@Body() id: number) {
    return await this.bookmarkService.getBookMark(id);
  }
  @Get()
  async getAllBookmarks() {
    return this.bookmarkService.getAllBookmarks();
  }
  @Get()
  async getMyBookMarks(@GetUser() user: User) {
    return await this.bookmarkService.getMyBookMarks(user.id);
  }
}
