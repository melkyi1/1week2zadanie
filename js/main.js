let eventBus = new Vue()
let app = new Vue({
   el:'#app',
        data: {
       visibility1:true,
       visibility: true,
                name: null,
                review: null,
                rating: null,

            reviews: [],
            reviews2: [],
            reviews3: [],

            },
        methods: {
       perenos(id) {
           let x = this.reviews.splice(id, 1)
            x = x.pop()
           this.reviews2.push(x)
           console.log(x)
           if (this.reviews2.length > 5) {
               this.reviews2.pop(x)
           }
       },
            perenos2(id2) {
           let x2 = this.reviews2.splice(id2, 1)
                x2 = x2.pop()
                this.reviews3.push(x2)
                console.log(x2)
            },
            hideButton() {
         this.visibility = false
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
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
            console.log(this.reviews.length)
            if (this.reviews.length > 3) {
                this.reviews.pop(productReview)

                    this.reviews2.push(productReview)
                    console.log(this.reviews2.length)
                if (this.reviews2.length > 5) {
                    this.reviews2.pop(productReview)

                    this.reviews3.push(productReview)
                    console.log(this.reviews3.length)
                }
            }
        })
    },
})
