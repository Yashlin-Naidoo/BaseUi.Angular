import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoggerInterceptor } from './logger.interceptor';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { HomeComponent } from './components/home/home.component';
import { LargeListComponent } from './components/large-list/large-list.component';
import { DateCalculationComponent } from './components/date-calculation/date-calculation.component';
import { ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    CommentsComponent,
    HomeComponent,
    LargeListComponent,
    DateCalculationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: LoggerInterceptor,
    multi: true,
  } ,{
    provide: ErrorHandler,
    useClass: ErrorHandlerService,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
