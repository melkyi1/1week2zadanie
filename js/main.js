let eventBus = new Vue()
let app = new Vue({
   el:'#app',
        data: {
                name: null,
                review: null,
                rating: null,
            reviews: [],
            },
        methods: {
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
        })
    },
})