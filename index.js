import { Application, View } from "backbone.marionette";
import { CompositionBehavior, watch, reactive, onAttached, onDestroyed } from "./composition-api";


function useScroll(listener) {

    function logic() {
        listener(window.pageYOffset);
    }

    onAttached(() => {
        window.addEventListener('scroll', logic, { passive: true });
    })

    onDestroyed(() => {
        window.removeEventListener('scroll', logic);
    })
}


const ChildView1 = View.extend({
    template: `
        <div>
            <div id="reg"></div>
            <div style="height:10000px" id="clicktest">child1</div>
        </div>
    `,
    behaviors: [CompositionBehavior],
    ui: {
        save: "#reg"
    },
    events: {
        "click #clicktest": function () {
            this.ref.a++;
        }
    },
    setup() {

        const ref = reactive({ a: 30, b: 40 })
        return { ref };
    },
    bind() {
        watch(() => {
            this.ui.save.text(this.ref.a);
        })
    },
})

const ChildView2 = View.extend({
    template: `
        <div>
            <div style="height:10000px" id="clicktest2">child2</div>
        </div>
    `,
    events: {
        "click #clicktest2": "haveABaby"
    },
    behaviors: [CompositionBehavior],
    setup() {
    },
})


const ParentView = View.extend({
    template: `<div>
            <button id="region1"> show 1 </button>
            <button id="region2"> show 2 </button>
            <div child-region></div>
        </div>`
    ,
    regions: {
        child: '[child-region]'
    },
    behaviors: [CompositionBehavior],
    ui: {
        goRegion1: '#region1',
        goRegion2: '#region2'
    },
    events: {
        "click @ui.goRegion1": function () {
            // this.getRegion('child').empty();
            this.showChildView('child', new ChildView1())
        },
        "click @ui.goRegion2": function () {
            // this.getRegion('child').empty();
            this.showChildView('child', new ChildView2())
        },
    }
})

const App = Application.extend({
    region: "#root",
    onStart() {
        this.showView(new ParentView());
    }
})
const app = new App();
app.start();

