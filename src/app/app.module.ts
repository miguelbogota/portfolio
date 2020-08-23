import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Additionals
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
// Main app
import { environment } from '@app-env/environment';
import { AppComponent } from './app.component';
// Modules
import { FireModule } from './fire.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Additionals
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // Modules
    FireModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
