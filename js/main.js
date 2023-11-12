let eventBus = new Vue()

Vue.component("zametki", {
    props: {
        id: {
            type: Number,
        },
        data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    template: `
    <div>
        <li><p>{{ data.name }}</p></li>
         <p v-for="(review, id) in data.allreviews" :allreviews="allreviews" :id="id">{{ review.viewname }}
         <button v-if="review.visibility"  v-on:click="review.visibility = !review.visibility" @click="review_update(id)">Выполнить</button></p>
         <p>{{ data.rating }}</p>
<!--         <div class="date" v-if="data.date">-->
<!--            <p>{{data.time}}</p>-->
<!--            <p>{{data.date}}</p>-->
<!--         </div>-->
    </div>
    `,
    methods: {
        review_update(id) {
            this.data.allreviews[id].completed = !this.data.allreviews[id].completed
            eventBus.$emit('update-reviews', this.id)
        },
    },
    mounted() {
        eventBus.$on('update-reviews', id => {
            let complete = 0;
            let NotComplete = 0;
            for (let f of this.data.allreviews) {
                if (f.completed) {
                    complete++;
                } else {
                    NotComplete++;
                }
            }
            this.data.completedNum = (complete / (complete + NotComplete)) * 100;
            if (this.data.completedNum > 50) eventBus.$emit('move-reviews2', id, this.data);
            if (this.data.completedNum === 100) eventBus.$emit('move-reviews3', id, this.data);
        })
    },
    data() {
        return {}
    },
} )
// 1 заметки
Vue.component('reviews', {
    props: {
        reviews: {
            type: Array
        },
        zametki: {
            type: Array
        },
        id: {
            type: Number
        },
    },
    template: `
         <div class="zametka1FORM">
        <ul>
            <zametki :data="data" v-for="(data, index) in reviews" :id="index"></zametki>
        </ul>
        </div>
    `, })
    Vue.component('reviews2', {
        props: {
            reviews2: {
                type: Array
            },
            zametki: {
                type: Array
            },
            id: {
                type: Number
            },
        },
        template: `
         <div class="zametka2FORM">
        <ul>
            <zametki :data="data" v-for="(data, index) in reviews2" :id="index"></zametki>
        </ul>
        </div>
    `, })
    Vue.component('reviews3', {
    props: {
        reviews3: {
            type: Array
        },
        zametki: {
            type: Array
        },
        id: {
            type: Number
        },
    },
    template: `
         <div class="zametka3FORM">
        <ul>
            <zametki :data="data" v-for="(data, index) in reviews3" :id="index"></zametki>
        </ul>
        </div>
    `,
    data() {
        return {
            taskname: null,
            tasks: [],
        }
    }
})

let app = new Vue({
   el:'#app',
        data: {
       visible: false,
            visible1: false,
            visible3view: false,
            allreviews: [],
            reviews: [],
            reviews2: [],
            reviews3: [],
            productReview: {
                name: null,

                review1: {
                    viewname: null,
                    visibility: true,
                    completed: false
                },
                review2: {
                    viewname: null,
                    visibility: true,
                    completed: false
                },
                review3: {
                    viewname: null,
                    visibility: true,
                    completed: false
                },
                review4: {
                    viewname: null,
                    visibility: true,
                    completed: false
                },
                review5: {
                    viewname: null,
                    visibility: true,
                    completed: false
                },
                rating: 0,
            },
            //флажки попытаюсь сделать
            },
        methods: {
            hidebutoff() {
                this.visible3view= false
                this.visible = false
            },
            onSubmit() {
                if (this.productReview.review1.viewname) this.allreviews.push(this.productReview.review1)
                if (this.productReview.review2.viewname) this.allreviews.push(this.productReview.review2)
                if (this.productReview.review3.viewname) this.allreviews.push(this.productReview.review3)
                if (this.productReview.review4.viewname) this.allreviews.push(this.productReview.review4)
                if (this.productReview.review5.viewname) this.allreviews.push(this.productReview.review5)

                if (this.reviews.length < 3) {
                    if (this.allreviews.length >= 3 && this.productReview.name) {
                        this.reviews.push(
                            {
                                name: this.productReview.name,
                                allreviews: this.allreviews,
                                rating: this.productReview.rating
                            }
                        )
                    }
                    else alert('Заполните поля (как минимум 3) и имя')
                } console.log(this.reviews);
                this.productReview.name = '';
                this.productReview.review1 = {visibility: true, completed: false};
                this.productReview.review1.reviewname = '';
                this.productReview.name = '';
                this.productReview.review2 = {visibility: true, completed: false};
                this.productReview.review2.reviewname = '';
                this.productReview.name = '';
                this.productReview.review3 = {visibility: true, completed: false};
                this.productReview.review3.reviewname = '';
                this.productReview.name = '';
                this.productReview.review4 = {visibility: true, completed: false};
                this.productReview.review4.reviewname = '';
                this.productReview.name = '';
                this.productReview.review5 = {visibility: true, completed: false};
                this.productReview.review5.reviewname = '';
                this.allreviews = [];
                this.productReview.rating='';
                // this.save()
            },
        },
    mounted() {
       eventBus.$on('move-reviews2', (id) => {
        if (this.reviews2.length < 5) {
            if (this.reviews[id].completedNum >= 50) {
                this.reviews2.push(this.reviews[id])
                this.reviews.splice(id, 1)
                // this.save()
            }
        }
    });
        eventBus.$on('move-reviews3', (id) => {
            if (this.reviews2[id].completedNum === 100) {
                // this.time(id)
                this.reviews3.push(this.reviews2[id])
                this.reviews2.splice(id, 1)
                // this.save()
            }
        })
    }
})
// <button v-if="task.visible"  v-on:click="task.visible = !task.visible" @click="task_update(id)">Выполнить</button>

// eventBus.$on('move-reviews2', (id) => {
//     if (this.column2.length < 5) {
//         if (this.column1[id].completedNum >= 50) {
//             this.column2.push(this.column1[id])
//             this.column1.splice(id, 1)
//             this.save()
//         }
//     }
// });
// eventBus.$on('move-reviews3', (id) => {
//     if (this.column2[id].completedNum === 100) {
//         this.time(id)
//         this.column3.push(this.column2[id])
//         this.column2.splice(id, 1)
//         this.save()
//     }
// }),