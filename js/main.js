let eventBus = new Vue()
let app = new Vue({
   el:'#app',
        data: {
       visibility1:true,
       visibility: true,
                name: null,
                review: null,
                rating: null,

            name2:null,
            review2:null,
            rating2:null,

            reviews: [],
            reviews2: [],
            },
        methods: {
       hideButton() {
         this.visibility = false
       },
            onSubmit2() {
           if (this.name2 && this.review2 && this.rating2) {
               let productReview2 = {
                   name2: this.name2,
                   review2: this.review2,
                   rating2: this.rating2,
               }
               eventBus.$emit('review-submitted', productReview)
               this.name2 = null
               this.review2 = null
               this.rating2 = null
           }
            },
            onSubmit() {
                if (this.name && this.review && this.rating) {
                    let productReview = {
                        name: this.name,
                        review: this.review,
                        rating: this.rating,

                    }
                    eventBus.$emit('review-submitted', productReview)
                    this.name = null
                    this.review = null
                    this.rating = null
                }
            },

        },
    // mounted2() {
    //    eventBus.$on('review-submitted2', productReview2 => {
    //   this.reviews2.push(productReview2)
    //   console.log(this.reviews2.length)
    //    })
    // },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
            console.log(this.reviews.length)
            if (this.reviews.length > 1) {
                this.reviews.pop(productReview)

                    this.reviews2.push(productReview)
                    console.log(this.reviews2.length)
            }
        })
    },
})
