import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FinanceiroModule } from './financeiro/financeiro.module';
import { CompromissoController } from './compromisso/compromisso.controller';
import { CompromissoModule } from './compromisso/compromisso.module';
import { RotinaService } from './rotina/rotina.service';
import { RotinaController } from './rotina/rotina.controller';
import { RotinaModule } from './rotina/rotina.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, FinanceiroModule, CompromissoModule, RotinaModule, AuthModule],
  controllers: [AppController, CompromissoController, RotinaController],
  providers: [AppService, RotinaService],
})
export class AppModule {}
