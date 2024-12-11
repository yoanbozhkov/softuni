import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './app-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    // provideClientHydration(),
    provideHttpClient(withInterceptors([appInterceptor])),
  ],
};
