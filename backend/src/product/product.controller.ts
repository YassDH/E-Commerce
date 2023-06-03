import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { AdminGuard } from 'src/user/admin.guard';
import { ProductAddDTO } from './dto/add-product';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { ProductEditDTO } from './dto/edit-product';
import { Observable, of } from 'rxjs';
import { ProductQueryDTO } from './dto/query-product';

@Controller('product')
export class ProductController {
    constructor(private productService : ProductService){}

    @UseGuards(AdminGuard)
    @Post('/upload')
    @UseInterceptors(FileInterceptor('productImage', {
        storage: diskStorage({
          destination: './productsImages',
          filename : (req, file, cb) =>{
            const filename : String = path.parse(file.originalname).name.replace(/\s/g, '')+uuidv4();
            const extention : String = path.parse(file.originalname).ext;
            cb(null, `${filename}${extention}`)
          }
        })
    }))
    async uploadFile(@UploadedFile() file) : Promise<String>{
        return file.filename
    }

    @UseGuards(AdminGuard)
    @Post('/add')
    async addProduct(@Body() product : ProductAddDTO){
        return await this.productService.addProduct(product)
    }
    //http://localhost:5000/product/productsImages/{imageName}
    @Get('productsImages/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res) : Observable<Object>{
      return of(res.sendFile(path.join(process.cwd(), 'productsImages/'+imagename )))
    }

    @Get('query')
    async queryProducts(@Query() query : ProductQueryDTO){
        return await this.productService.queryProducts(query);
    }

    @Get('')
    async getProducts(){
      return await this.productService.getProducts();
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id : number){
        return await this.productService.deleteProduct(id) 
    }


    @Get(':id')
    async getProduct(@Param('id', ParseIntPipe) id : number){
      return await this.productService.getProduct(id);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    async editProduct(@Param('id', ParseIntPipe) id : number, @Body() toEdit : ProductEditDTO){
      return await this.productService.editProduct(id, toEdit);
    }


}
