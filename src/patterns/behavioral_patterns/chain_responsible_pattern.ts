// chain of responsible is used to event handling for example
// EventListener , try catch method.

namespace ChainResponsiblePattern {

    type RequestType = 'help' | 'feedback' | 'some';

    interface Request {
        type: RequestType;
    }

    class Handler {
        private successor!: Handler;
        handle(request: Request): void {
            console.log(this.successor, request, 'this is main handler');
            if (this.successor) {
                this.successor.handle(request);
                console.log('Main handler route');
            }
        }
    }
    class HelpHandler extends Handler {
        handle(request: Request): void {
            if (request.type === 'help') {
                // Show help information.
            } else {
                super.handle(request);
            }
        }
    }


    class FeedbackHandler extends Handler {
        handle(request: Request): void {
            if (request.type === 'feedback') {
                // Prompt for feedback.
                console.log('request is feedback');
            } else {
                super.handle(request);
            }
        }
    }
    // ten error przejdzie przez klase SecondHandler i FeedbackHandler
    class SecondHandler extends FeedbackHandler {
        handle(request: Request): void {
            if (request.type === 'some') {
                // Prompt for feedback.
                console.log('request is some');
            } else {
                super.handle(request);
            }
        }
    }

    let req: Request = { type: 'help' };
    const secondHandler = new SecondHandler();
    secondHandler.handle(req);

}