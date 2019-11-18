import { EventEmitter } from 'events';

namespace FacadePattern {

    class Thigh { }
    class Shank { }
    class Foot { }

    class MotionController {
        constructor(public leg: Leg) { }

        setAngle(angle: number): void {
            let { thigh, shank, foot } = this.leg;
            // ...
        }
    }

    class FeedbackController extends EventEmitter {
        constructor(public foot: Foot) {
            super();
        }
    }

    class Leg {
        thigh = new Thigh();
        shank = new Shank();
        foot = new Foot();
        motionController: MotionController;
        feedbackController: FeedbackController;

        constructor() {
            this.motionController = new MotionController(this);
            this.feedbackController = new FeedbackController(this.foot);
            this.feedbackController.on('touch', (value) => {
                console.log('tooched',value);
            });
        }
    }

    class Robot {
        leftLegMotion: MotionController;
        rightLegMotion: MotionController;
        leftFootFeedback: FeedbackController;
        rightFootFeedback: FeedbackController;
        constructor(){
            this.leftLegMotion = new MotionController(new Leg());
            this.rightLegMotion = new MotionController(new Leg());
            this.leftFootFeedback = new FeedbackController(new Foot());
            this.rightFootFeedback = new FeedbackController(new Foot());

            this.rightFootFeedback.on('walk',(steps) => console.log('walking nr of steps is ', steps));
        }
        walk(steps: number): void { 
            this.rightFootFeedback.emit('walk',steps);
        }
        jump(strength: number): void { }
    }

    let robot = new Robot();
    robot.walk(4);
    robot.leftLegMotion.leg.feedbackController.emit('touch',3);

    let my = new EventEmitter();
    my.on('some',()=>console.log('some is defined'));
    my.addListener('some', ()=>console.log('some is added'));
    my.emit('some',[1,23]);

}