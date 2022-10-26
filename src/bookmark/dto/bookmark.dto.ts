import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookmarkDto {
  

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  
}
