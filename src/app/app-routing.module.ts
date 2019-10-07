import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, data: { side: 'center' } },
	{ path: 'contact', component: ContactComponent, data: { side: 'left' } },
	{ path: 'porfolio', component: PortfolioComponent, data: { side: 'right' } },
	{ path: 'porfolio/:id', component: ProjectComponent },
	{ path: 'about', component: AboutComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }