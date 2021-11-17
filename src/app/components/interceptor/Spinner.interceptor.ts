import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { SpinnerService } from "../../services/spinner.service";


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor{
    
    constructor(private Spinnersvc: SpinnerService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.Spinnersvc.show();

        return next.handle(req).pipe(
            finalize( () => this.Spinnersvc.hide())
        );

    }
    
}