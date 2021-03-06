import {Reducer, Dispatcher, INITIAL_REDUCER, StoreModule} from "@ngrx/store";
import {OpaqueToken, NgModule} from "@angular/core";
import {createReducer} from "./createReducer";
export const UNDO_DEVTOOLS_CONFIG = new OpaqueToken('@ngrx/undodevtools Options');
export const UNDO_ACTION = "ngrx-undo/UNDO_ACTION";
@NgModule({
    imports: [
        StoreModule
    ]
})
export class StoreUndoModule {
    static interceptStore(options = {bufferSize: 100}) {
        return {
            ngModule: StoreUndoModule,
            providers: [
                {provide: UNDO_DEVTOOLS_CONFIG, useValue: options},
                {
                    provide: Reducer,
                    deps: [Dispatcher, INITIAL_REDUCER, UNDO_DEVTOOLS_CONFIG],
                    useFactory: createReducer
                }
            ]
        };
    }
}
