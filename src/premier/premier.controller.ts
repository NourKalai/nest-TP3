import {Controller, Get, Post, Put, Patch, Delete} from '@nestjs/common';

@Controller('premier')
export class PremierController {
    @Get()
    get():string{
        console.log('GET')
        return 'GET';
    }

    @Post()
    post(): string{
        console.log('POST')
        return 'POST';
    }

    @Put()
    put(): string{
        console.log('PUT')
        return 'PUT';
    }

    @Delete()
    delete(): string{
        console.log('DELETE')
        return 'DELETE';
    }
    @Patch()
    patch(): string{
        console.log('PATCH')
        return 'PATCH';
    }

}