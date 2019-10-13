import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Additionals
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
//import { AngularFireFunctionsModule } from '@angular/fire/functions';

// Keys
import { environment } from '../environments/environment';

// Services
import { ProjectService } from './services/project.service';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectComponent } from './components/project/project.component';
import { LoadingSpinnerComponent } from './animations/loading-spinner/loading-spinner.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavComponent,
		FooterComponent,
		HomeComponent,
		AboutComponent,
		PortfolioComponent,
		ContactComponent,
		ProjectComponent,
		LoadingSpinnerComponent,
		AdminComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
		AngularFirestoreModule.enablePersistence(),
		AngularFireStorageModule,
		AngularFireAuthModule
	],
	providers: [ProjectService],
	bootstrap: [AppComponent]
})
export class AppModule { }
