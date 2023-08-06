import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
    @ApiProperty()
    email: string

    @ApiProperty()
    mat_khau: string
}
