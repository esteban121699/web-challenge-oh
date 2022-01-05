import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * When the HttpClient is used to make requests they are pointed to the same domain that
 * provides the angular app, this scenario only valid when the Angular app is served from the
 * same domain as the backend api but our architecture is different, we have separated domains
 * for the Angular app (manage.vetpraxis.cloud) and the backend api (api.vetpraxis.cloud).
 *
 * The BackendInterceptor modifies the http requests to point to the backend server set
 * in the `backendUrl` of the environment object when the request starts with `api/`,
 * `oauth/` or `config/`.
 * */
@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  private backend = environment.api;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('api/')) {
      const backendRequest = req.clone({
        url: this.backend + req.url
      });
      return next.handle(backendRequest);
    }
    return next.handle(req);
  }
}
