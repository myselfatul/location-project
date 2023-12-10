import { Module } from '@nestjs/common';
import { CoreThirdPartyService } from './third-party-toll-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [],
  providers: [CoreThirdPartyService],
  exports: [CoreThirdPartyService]
})
export class CoreThirdPartyModule {}
