import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from 'src/user/auth.guard';

@Controller('stats')
export class StatsController {
    constructor(private readonly statService: StatsService) {}

    
  @UseGuards(AuthGuard)
  @Get('')
  async getDashboardStats(){
    return await this.statService.getDashboardStats()
  }
}
