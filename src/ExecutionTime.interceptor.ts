import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class ExecutionTime implements NestInterceptor{
    private readonly logger = new Logger(ExecutionTime.name);
    intercept(
        context: ExecutionContext,
         next: CallHandler<any>
        ): Observable<any> | Promise<Observable<any>> {
            const handler = context.getHandler;
            const methodName = handler.name;
            const classNmae = context.getClass().name;

            this.logger.log(`Before... calling ${classNmae}.${methodName}`);
            const startTime = Date.now();
            return next.handle().pipe(
                tap(() => {
                  this.logger.log(`After... ${classNmae}.${methodName} took ${Date.now() - startTime}ms`);
                })
            )
    }
    
}