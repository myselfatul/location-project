import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { LocationService } from './location/location.service';
import { CoreThirdPartyModule } from './core/third-party-toll-api.module';
import { TimingMiddleware } from './middleware/api-time.middleware';

@Module({
  imports: [CoreThirdPartyModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, LocationService, TimingMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimingMiddleware).forRoutes('*');
  }
}

